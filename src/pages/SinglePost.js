//Libraries
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//styles
import "./css/singlepost.css";

//Components
import CardForPost from "../components/CardForPost";
import { AuthContext } from "../helpers/AuthContext";

function SinglePost() {
  //global authentication state from AuthContext
  const { authState } = useContext(AuthContext);

  //useParams is used to hook into the parameter included in the url
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  //get request for a post based on given id
  useEffect(() => {
    axios
      .get(`https://social-app-api-0.herokuapp.com/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      });

    axios
      .get(`https://social-app-api-0.herokuapp.com/comments/getcomments/${id}`)
      .then((response) => {
        setComments(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //post request to create a comment
  const submitComment = () => {
    axios
      .post(
        `https://social-app-api-0.herokuapp.com/comments/createcomment`,
        {
          commentBody: newComment,
          postId: id,
        },
        //sending the web token stored in local storage through request headers
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          //if error exists, it means the token was not valid
          //authMiddleware.js takes care of verifying if token is valid
          alert("User not logged in!");
        } else {
          const commentToAdd = {
            _id: response.data._id,
            commentBody: newComment,
            post: response.data.post,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          console.log(comments);
          setNewComment("");
        }
      });
  };

  //delete request to delete a comment
  const deleteComment = (id) => {
    axios
      .delete(
        `https://social-app-api-0.herokuapp.com/comments/deletecomment/${id}`,
        //sending web token through req headers
        {
          headers: { acessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          //if error exists, it means the token was not valid
          //authMiddleware.js takes care of verifying if token is valid
          alert("User not logged in");
        } else {
          //optimistic rendering
          setComments(comments.filter((comment) => comment._id !== id));
        }
      });
  };

  //event handling function
  const hitEnter = (e) => {
    if (e.keyCode === 13) {
      submitComment();
    }
  };

  return (
    <div className="single-post-container">
      <div className="left-section">
        <CardForPost
          title={post.title}
          content={post.content}
          username={post.username}
        />
      </div>
      <div className="right-section">
        <div className="comment-input">
          <input
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              console.log(newComment);
            }}
            onKeyUp={hitEnter}
          />
          <button onClick={submitComment}>comment</button>
        </div>
        <div className="comment-list">
          {comments.map((val, key) => {
            return (
              <div className="each-comment">
                <div key={val._id}>
                  <span className="user-span">{val.username}</span>
                  <span>{val.commentBody}</span>
                </div>
                {authState.username === val.username && (
                  <button
                    onClick={() => {
                      deleteComment(val._id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
