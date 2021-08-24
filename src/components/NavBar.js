//libraries
import React, { useContext } from "react";
import { Link } from "react-router-dom";

//components
import { AuthContext } from "../helpers/AuthContext";

//styles
import "./css/navbar.css";

function NavBar() {
  //grabbing global authentication state from AuthContext
  //will use for conditional logic involved in rendering of login/registration links
  const { authState, setAuthState } = useContext(AuthContext);

  //logout function
  const logout = () => {
    //removing access token from local storage
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="bar-container">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/createpost">
        Post
      </Link>
      {!authState.status ? (
        <>
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/registration">
            Registration
          </Link>
        </>
      ) : (
        <div className="user_container">
          <div className="nav_username">@{authState.username}</div>
          <button className="link" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
