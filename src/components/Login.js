import React, { useState, useContext } from "react";
import axios from "axios";

import Input from "./Input";
import LoginContext from "../contexts/LoginContext";

import "../App.css";
import Loader from "./Loader";

export default function Login() {
  const defaultInputs = {
    username: "",
    password: ""
  };
  const [inputs, setInputs] = useState(defaultInputs);
  const [loader, setLoader] = useState(false);

  const login = useContext(LoginContext);

  const getInput = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const showLoader = () => {
    setLoader(true);
  };

  const validateInputs = () => {
    if (inputs.username === "" || inputs.password === "") {
      return alert("Please fill the form");
    } else {
      showLoader();
      axios
        .get("https://5d664572520e1b00141ee08f.mockapi.io/api/v10/users")
        .then(function(response) {
          setLoader(false);
          if (
            inputs.username === response.data[0].email &&
            inputs.password === response.data[0].password
          ) {
            login.setLogin(true);
          } else {
            alert("Jo paye tehi le xirna paudaina ");
          }
        });
    }
  };

  return (
    <div>
      {loader === true ? <Loader /> : <div />}
      <div className="App">
        <div className="container11">
          <div className="container22">
            <div className="pp" />
            <div className="inputs">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={getInput}
                value={inputs.username}
              />
              <br /> <br /> <br />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={getInput}
                value={inputs.password}
              />
              <br /> <br /> <br />
              <br /> <br /> <br />
            </div>
            <button className="btn" onClick={validateInputs}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
