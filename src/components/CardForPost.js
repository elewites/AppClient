import React from "react";

//Styles
import "./css/cardforpost.css";

function CardForPost({ title, content, username }) {
  return (
    <div>
      <div className="singlePost">
        <span className="title">{title}</span>
        <span className="content">{content}</span>
        <span className="username">@{username}</span>
      </div>
      <div className="comments"></div>
    </div>
  );
}

export default CardForPost;
