//Libraries
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./css/home.css";
//Components
import CardForPost from "../components/CardForPost";

function Home() {
  //useHistory hook is used to push to another route
  const history = useHistory();

  const [posts, setPosts] = useState([]);

  //get request for all posts from database
  useEffect(() => {
    axios.get("https://social-app-api-0.herokuapp.com/posts/getposts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="home-container">
      {posts.map((value, key) => {
        return (
          <div
          className="home-post"
            key={key}
            onClick={() => {
              history.push(`/post/${value._id}`);
            }}
          >
            <CardForPost
              title={value.title}
              content={value.content}
              username={value.username}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
