import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import LoginContext from "./contexts/LoginContext";

function App() {
  const [auth, setAuth] = useState(false);

  function login() {
    setAuth(true);
  }

  function logout() {
    setAuth(false);
  }

  return (
    <LoginContext.Provider
      value={{ login: auth, setLogin: setAuth, login, logout }}
    >
      {auth === true ? <Dashboard /> : <Login />}
    </LoginContext.Provider>
  );
}

export default App;
