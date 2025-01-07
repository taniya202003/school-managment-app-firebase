import React, { useContext, useState } from "react";
import "../../assets/login.css";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { FaHandPointRight, FaRegEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Google } from "./Google";
import { doc, getDoc } from "firebase/firestore";
import { ContextProvider } from "../../context/Context";

export const LoginWithGoogle = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogOut } = useContext(ContextProvider);

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ); // this function is for login page
      const user = userCredentials.user;
      // if (user.emailVerified) {
      if (user) {
        // Fetch user data from Firestore, including role
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() || [];
          const userRole = userData.role || [] ;// Get role from Firestore

          // Checking if the user is blocked
          const blockedRef = doc(db, "blockedUsers", auth.currentUser.uid);
          const blockedSnap = await getDoc(blockedRef) || [];
          if (blockedSnap.exists()) {
            // If user is blocked, then show an alert and log the user out
            setTimeout(alert("You have been blocked by the admin."), 1000);
            await handleLogOut();
          } else {
            if (userRole === "ADMIN") {
              setTimeout(() => navigate("/adminPortal"), 2000);
            } else if (userRole === "TEACHER") {
              setTimeout(() => navigate("/teachersPortal"), 2000);
            } else if (userRole === "STUDENT") {
              setTimeout(() => navigate("/studentsPortal"), 2000);
            }
            toast.success(`User Logged In Successfully as ${userRole}`);
          }
        } else {
          console.log("No such document!");
          toast.error("User data not found");
        }
      } else {
        // toast.info("Please verify your email address first.");
      }
    } catch (error) {
      console.log(error.message,"error in loging in user");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-div">
        <form className="login-form" onSubmit={handleLogIn}>
          <h3 className="login-heading">Login</h3>

          <div className="login-inputs">
            <div className="login-input-div">
              <label className="login-input-label"> Email</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <input
                  className="login-input"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MdOutlineEmail className="input_icon" size={17} />
                <span
                  className="login-input-span"
                  style={{ position: "absolute" }}
                ></span>
              </div>
            </div>
            <div className="login-input-div">
              <label className="login-input-label">Password</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MdOutlineLock className="input_icon" size={20} />
                {showPassword ? (
                  <MdOutlineRemoveRedEye
                    className="input_password_icon" // You can style it to match your design
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="input_password_icon"
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  />
                )}
                <span
                  className="login-input-span"
                  style={{ position: "absolute" }}
                ></span>
              </div>
            </div>
          </div>

          <div className="login-submit-div">
            <div className="login-background"></div>
            <button className="login-submit-btn" type="submit">
              Login
            </button>
          </div>

          <div
            className="login-googleSignIn-Div-f"
            style={{ marginTop: "2rem" }}
          >
            <Google />
          </div>

          <div className="login-register-link" style={{ marginTop: "2rem" }}>
            <p className="login-register-p">Don't have an account?</p>
            <button className="login-registerPage-btn">
              <Link className="login-linkToregister" to={"/signinwithgoogle"}>
                <FaHandPointRight /> Click here to <b>SIGN UP</b>
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
