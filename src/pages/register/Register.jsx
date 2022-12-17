import React from "react";
import "./register.css";
import Topnavbar from "../../components/topnavbar/Topnavbar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();

  const navigateLogIn = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    try {
      await axios.post("/auth/register", user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topnavbar />
      <div className="login">
        <div className="loginWrap">
          <div className="loginLeft">
            <h3 className="loginLogo">Register</h3>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleSubmit}>
              <input
                placeholder="Username"
                ref={username}
                className="loginInput"
                required
              ></input>
              <input
                placeholder="Password"
                ref={password}
                className="loginInput"
                type="password"
                minLength="6"
                required
              ></input>
              <button className="loginButton" type="submit">
                Register
              </button>
              <button className="loginRegisterButton" onClick={navigateLogIn}>
                Go To Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
