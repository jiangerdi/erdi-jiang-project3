import React, { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Topnavbar from "../../components/topnavbar/Topnavbar";
import "./profile.css";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router";
import { format } from "timeago.js";

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/user?username=" + username);
      // console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  // console.log(user);

  return (
    <>
      <Topnavbar />
      <div className="profile">
        <div className="profileTop">
          {/* <Person htmlColor="navy" className="profileUserIcon" /> */}
          <span className="profileUserName">{user.username}</span>
          <span className="profileUserDate">
            {"Joined " + format(user.createdAt)}
          </span>
          <div className="profileUserDesc">
            {!user || username !== user.username ? (
              <span className="profileUserDescText">{user.desc}</span>
            ) : (
              <div>
                <Edit className="profileDescIcon" />
                <span className="profileUserDescText">{user.desc}</span>
              </div>
            )}
          </div>
        </div>
        <div className="profileBottom">
          <Feed username={username} />
        </div>
      </div>
    </>
  );
}
