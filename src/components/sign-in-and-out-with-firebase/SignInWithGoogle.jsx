import React, { useEffect, useState } from "react";
import "../../assets/register.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { FaRegUser } from "react-icons/fa6";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { FaHandPointRight, FaRegEyeSlash, FaRegImage } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Google } from "./Google";

export const SignInWithGoogle = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const roleArray = ["ADMIN", "TEACHER", "STUDENT"];

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // this function is used to register user directly to firebase console
      // all the info we like email password will be stored in auth
      const user = auth.currentUser; // here we are getting current usre from auth for exmple new submitted data
      if (user) {
        // Send verification email------
        // await sendEmailVerification(user);

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          // setDoc is to create collection store in firabse cloud store
          // insdie setDoc we will add doc that has our database and colllection name "users"  and user ids that we are getting form `user`
          email: user.email || null,
          userName: userName || null,
          password: password || null,
          role: role || null,
          photo: imageUrl || null,
        });
      }
      console.log("User Registered Successfully");
      toast.success(
        // "User Registered Successfully. Please check your email for verification."
        "User Registered Successfully"
      );
      setTimeout(() => (window.location.href = "/loginwithgoogle"), 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-form-div">
          <form className="register-form" onSubmit={handleSignUp}>
            <h3 className="register-heading">Sign Up</h3>

            <div className="register-inputs">
              <div className="register-input-div">
                <label className="register-input-label">Username</label>
                <div className="register-inputs-singleDivs">
                  <input
                    className="register-input-tag"
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  <FaRegUser className="input_icon" size={15} />
                  <span
                    className="register-input-span"
                    style={{ position: "absolute" }}
                  ></span>
                </div>
              </div>
              <div className="register-input-div">
                <label className="register-input-label">Image </label>
                <div className="register-inputs-singleDivs">
                  <input
                    className="register-input-tag"
                    type="text"
                    placeholder="Enter Image Url"
                    name="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                  <FaRegImage className="input_icon" size={15} />
                  <span
                    className="register-input-span"
                    style={{ position: "absolute" }}
                  ></span>
                </div>
              </div>
              <div className="register-input-div">
                <label className="register-input-label">Email</label>
                <div className="register-inputs-singleDivs">
                  <input
                    className="register-input-tag"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <MdOutlineEmail className="input_icon" size={17} />
                  <span
                    className="register-input-span"
                    style={{ position: "absolute" }}
                  ></span>
                </div>
              </div>
              <div className="register-input-div">
                <label className="register-input-label">Password</label>
                <div className="register-inputs-singleDivs">
                  <input
                    className="register-input-tag"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <MdOutlineLock className="input_icon" size={20} />
                  {showPassword ? (
                    <MdOutlineRemoveRedEye
                      className="input_password_icon" // You can style it to match your design
                      size={20}
                      // onClick={togglePasswordVisibility}
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
                    className="register-input-span"
                    style={{ position: "absolute" }}
                  ></span>
                </div>
              </div>
              <div className="register-inputRole-div">
                <label className="register-input-label">Role:</label>
                {roleArray.length > 0 &&
                  roleArray.map((el, i) => (
                    <div className="register-inputRole-singleDivs" key={i}>
                      <p className="inputRole-p">
                        <input
                          type="radio"
                          name="role"
                          value={el}
                          checked={role === el}
                          onChange={() => setRole(el)}
                        />
                        <span className="inputRole-p-textspan">{el}</span>
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="register-signUpBtn-div">
              <div className="register-background"></div>
              <button className="register-signUp-btn" type="submit">
                Sign Up
              </button>
            </div>

            <div className="register-googleSignIn-Div">
              <Google />
            </div>

            <div className="register-login-div" style={{ marginTop: "1rem" }}>
              <p className="register-login-p">Already registered ?</p>
              <button className="register-loginPage-btn">
                <Link className="register-linkTologin" to="/loginwithgoogle">
                  <FaHandPointRight /> Click here to <b>Sign In</b>
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
