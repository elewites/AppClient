//Libraries
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

//Styles
import "./css/form.css";

function CreatePost() {
  //Validation Schema for form submission
  const validationSchema = Yup.object().shape({
    title: Yup.string().min(5).required(),
    content: Yup.string().required(),
  });

  //Initial values for form
  const initialValues = {
    title: "",
    content: "",
  };

  //on sumbit function and redirection
  let history = useHistory();
  const onSubmit = (data) => {
    axios
      .post("https://social-api.herokuapp.com/posts/createpost", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          //if response.data.error exists, it means accessToken 
          //was not validated by validateToken middleware
          alert("User is not logged in");
        } else {
          alert(
            `Post Created! You will be taken to homepage so you can check out your awesome post :)`
          );
          history.push("/");
        }
      });
  };

  return (
    <div className="post-container">
      <div className="formik-container">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="form">
            <label>Title:</label>
            <ErrorMessage name="title" component="span" className="span" />
            <Field
              className="field"
              autoComplete="off"
              name="title"
              placeholder="title..."
            ></Field>
            <label>Content:</label>
            <ErrorMessage name="content" component="span" className="span"/>
            <Field
              className="field"
              autoComplete="off"
              name="content"
              placeholder="content..."
            ></Field>

            <button className="create-button" type="submit">
              Create Post
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreatePost;
