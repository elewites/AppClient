//libraries
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
  //useHistory() hook used to re-route
  const history = useHistory();

  //initial values of form
  const initialValues = {
    username: "",
    password: "",
  };

  //validation schema for form
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  //post request to create a new user
  const onSubmit = (data) => {
    axios
      .post("https://social-app-api-0.herokuapp.com/users/createuser", data)
      .then((response) => {
        if (response.data !== "Username already exists") {
          alert(response.data);
          history.push("/login");
        } else alert(response.data);
      });
  };

  return (
    <div className="post-container">
      <div className="formik-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="form">
            <label>Username:</label>
            <ErrorMessage name="username" component="span" />
            <Field
              className="field"
              autoComplete="off"
              name="username"
              placeholder="username..."
            ></Field>
            <label>Password:</label>
            <ErrorMessage name="password" component="span" />
            <Field
              className="field"
              autoComplete="off"
              name="password"
              placeholder="password..."
              type="password"
            ></Field>
            <button className="create-button" type="submit">
              Create Account
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
