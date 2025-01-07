import React, { useState } from "react";
import "../../assets/login.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { FaHandPointRight } from "react-icons/fa";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const getUserCredentials = JSON.parse(localStorage.getItem("users")) || [];
    console.log(getUserCredentials,'getUserCredentials')

    const matchCredentials = getUserCredentials.find(
      (user) => user.email === email && user.password === password
    );

    const matchPassword = getUserCredentials.find((user) => user.password === password);

    if (matchCredentials) {
      toast.success("Login Successful");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/profileA"), 1000);
    }else if(!matchPassword){
      toast.error("Wrong Password");
    }else{
      toast.error("Invalid Email");
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
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MdOutlineLock className="input_icon" size={20} />
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

          <div className="login-register-link">
            <p className="login-register-p">Don't have an account?</p>
            <button className="login-registerPage-btn">
              <Link className="login-linkToregister" to={"/register"}>
                <FaHandPointRight /> Click here to <b>SIGN UP</b>
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
