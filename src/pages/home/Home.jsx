import React from "react";
import Feed from "../../components/feed/Feed";
import Topnavbar from "../../components/topnavbar/Topnavbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <Topnavbar />
      <div className="homepage">
        <Feed />
      </div>
    </>
  );
}
