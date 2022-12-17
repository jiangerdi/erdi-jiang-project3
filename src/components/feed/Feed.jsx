import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Update from "../update/Update";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const logIn = localStorage.getItem("LoggedIn");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("post/timeline/639adb9ea104602edfe8e6e8");
      // console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);

  // console.log(posts);

  return (
    <div className="feed">
      <div className="feedWrap">
        {logIn && user && username === user.username ? <Update /> : null}
        {posts?.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
