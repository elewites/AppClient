//Libraries
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//Styles
import "./App.css";

//Components
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";

function App() {
  //global authentication state
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  /*this useEffect makes sure on every re-render the authState is 
  set to true if accessToken is stored in local storage.
  In addition, we use our validateToken middleware to check
  the stored web token is valid*/
  useEffect(() => {
    axios
      .get("https://social-api.herokuapp.com/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          //just changing status in authState, other values remain unchanged
          setAuthState({ ...authState, status: false });
        } else {
          //setting authState to user info obtained in response
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {/* every component wrapped in AuthContext will have access to 
      variables we pass inside of the context*/}
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {/*Navbar sits outside switch statement to make it sticky, this
        allos it to be sticky across all components*/}
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={SinglePost} />
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
