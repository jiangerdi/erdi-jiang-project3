import React, { useContext } from "react";
import "./topnavbar.css";
import { Search, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topnavbar() {
  const { user } = useContext(AuthContext);

  // console.log(user);

  const logout = () => {
    localStorage.removeItem("LoggedIn");
    window.location.reload();
  };

  return (
    <div className="topnavbarContainer">
      <div className="topnavbarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="topnavbarLogo">Project 3 Social App</span>
        </Link>
      </div>
      <div className="topnavbarCenter">
        <div className="searchbar">
          <Search className="searchbarIcon" />
          <input placeholder="Search for a user" className="searchbarInput" />
        </div>
      </div>
      <div className="topnavbarRight">
        <div className="topnavbarLinks">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <span className="topnavbarLink">Home</span>
          </Link>
          {user ? (
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <span className="topnavbarLink">Log In Another</span>
            </Link>
          ) : (
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <span className="topnavbarLink">Log In</span>
            </Link>
          )}
          {user ? (
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <span className="topnavbarLink" onClick={logout}>
                Log Out
              </span>
            </Link>
          ) : (
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <span className="topnavbarLink">Sign Up</span>
            </Link>
          )}
        </div>
        <div className="topnavbarIcons">
          <div className="topnavbarIcon">
            {user ? (
              <Link
                to={"/profile/" + user.username}
                style={{ textDecoration: "none" }}
              >
                <Person />
                <span className="topnavbarUsername">{user.username}</span>
              </Link>
            ) : (
              <Person />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
