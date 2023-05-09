//libraries
import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

//components
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  //grabbing the function setAuthState from AuthContext
  const { setAuthState } = useContext(AuthContext);

  //useHistory() hook will be used to push to another route
  const history = useHistory();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string(),
    password: Yup.string(),
  });

  //post request to login and then store json web token in session storage
  const onSubmit = (data) => {
    axios
      .post("https://social-api.herokuapp.com/users/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //saving the webtoken in local storage as a key/value pair
          localStorage.setItem("accessToken", response.data.token);
          //when we save the web token in storage, we change authState status to true
          //meaning user is authenticated
          //we also save the username and id in global authState
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          alert(
            `Welcome back ${response.data.username}! We will take you to the home page now :)`
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
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="form">
            <label>Username:</label>
            <ErrorMessage name="username" component="span" className="span" />
            <Field
              className="field"
              autoComplete="off"
              name="username"
              placeholder="username..."
            ></Field>
            <label>Password:</label>
            <ErrorMessage name="password" component="span" className="span" />
            <Field
              className="field"
              autoComplete="off"
              name="password"
              placeholder="password..."
              type="password"
            ></Field>
            <button className="create-button" type="submit">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
