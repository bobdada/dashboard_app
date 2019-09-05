import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import LoginContext from "./contexts/LoginContext";
import SignUp from "./components/SignUp";
import Loader from "./components/Loader";
import * as firebase from "firebase";

function App() {
  const [loginState, setLoginState] = useState(null);
  function routeLogin() {
    switch (loginState) {
      case "login":
        return <Dashboard />;
      case "logout":
        return <Login setLoginState={setLoginState} />;
      default:
        return <Loader />;
      // console.log("hey");
    }
  }
  firebase.auth().onAuthStateChanged(user => {
    if (user === null) {
      setLoginState("logout");
    } else if (user !== null) {
      setLoginState("login");
    }
  });
  return (
    <LoginContext.Provider
    // value={{
    //   loginState,
    //   setLoginState,
    //   routeLogin,
    // }}
    >
      <div>{routeLogin()}</div>
    </LoginContext.Provider>
  );
}
export default App;
