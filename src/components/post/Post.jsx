import React, { useEffect, useState } from "react";
import "./post.css";
import { Person, Edit } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/user?userId=" + post.userId);
      // console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  //console.log(user);

  return (
    <div className="post">
      <div className="postWrap">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={"/profile/" + user.username}>
              <Person htmlColor="navy" className="postUserIcon" />
            </Link>
            <Link
              to={"/profile/" + user.username}
              style={{ textDecoration: "none" }}
            >
              <span className="postUserName">{user.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <Edit />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImage"></img>
        </div>
        <div className="postBottom">
          <div className="postComment">Comments</div>
        </div>
      </div>
    </div>
  );
}
