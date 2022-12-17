import React, { useContext } from "react";
import "./update.css";
import { Person, Image } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";

export default function Update() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef();

  const submitFunction = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="update">
      <div className="updateWrap">
        <div className="updateTop">
          <Person htmlColor="navy" className="updateUserIcon" />
          <input
            placeholder="Share your ideas"
            className="updateInput"
            ref={desc}
            required
          />
        </div>
        <hr className="updateHr" />
        <form className="updateBottom" onSubmit={submitFunction}>
          <div className="updateOptions">
            <label htmlFor="file" className="updateOption">
              <Image htmlColor="skyblue" className="updateIcon" />
              <span className="updateImageText">Image</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="updateButton" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
