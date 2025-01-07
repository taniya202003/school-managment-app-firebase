import React, { useState } from "react";
import "../../assets/register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { FaHandPointRight } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { userName, email, password };
    const updatedUsers = [...storedUser, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    if (!signUpSuccessful) {
      setSignUpSuccessful(true);
      toast.success("Sign up successful! You can now login.");
      setTimeout(() => navigate("/login"), 1000);
    }
    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
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
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MdOutlineLock className="input_icon" size={20} />
                <span
                  className="register-input-span"
                  style={{ position: "absolute" }}
                ></span>
              </div>
            </div>
          </div>

          <div className="register-signUpBtn-div">
            <div className="register-background"></div>
            <button className="register-signUp-btn" type="submit">
              Sign Up
            </button>
          </div>

          <div className="register-login-div">
            <p className="register-login-p">Already registered ?</p>
            <button className="register-loginPage-btn">
              <Link className="register-linkTologin" to="/login">
                <FaHandPointRight /> Click here to <b>Sign In</b>
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
