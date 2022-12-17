import React, { useContext } from "react";
import "./login.css";
import Topnavbar from "../../components/topnavbar/Topnavbar";
import { useRef } from "react";
import { loginReq } from "../../callApi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const navigateRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginReq(
        { username: username.current.value, password: password.current.value },
        dispatch
      );
      navigate("/");
      localStorage.setItem("LoggedIn", true);
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
            <h3 className="loginLogo">Log In</h3>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleSubmit}>
              <input
                placeholder="Username"
                className="loginInput"
                ref={username}
                required
              ></input>
              <input
                placeholder="Password"
                type="password"
                className="loginInput"
                ref={password}
                minLength="6"
                required
              ></input>
              <button
                className="loginButton"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? "Loading" : "Log In"}
              </button>
              <button
                className="loginRegisterButton"
                onClick={navigateRegister}
              >
                Go To Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
