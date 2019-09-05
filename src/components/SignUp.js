import React, { useState, useContext } from "react";
import * as firebase from "firebase";
import LoginContext from "../contexts/LoginContext";

import Loader from "./Loader";
import Login from "./Login";

export default function SignUp() {
  const defaultInputs = {
    email: "",
    password: "",
  };
  const [inputs, setInputs] = useState(defaultInputs);
  const [loader, setLoader] = useState(false);
  const login = useContext(LoginContext);
  const getInput = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // const showLoader = () => {
  //   setLoader(true);
  // };

  const createUser = e => {
    //showLoader();
    e.preventDefault();
    login.signUp();
    if (inputs.username === "" || inputs.password === "") {
      alert("Please fill the form");
      login.signUp();
    } else {
      let storageRef = firebase.storage().ref;

      firebase
        .auth()
        .createUserWithEmailAndPassword(inputs.email, inputs.password)
        .then(newUser => {
          //setLoader(false);
          console.log(newUser);
          login.setShowSignup(false);
        })
        .catch(e => {
          // setLoader(false);
          console.log(e);
          switch (e.code) {
            case "auth/invalid-email":
              console.log("please enter email address");
              break;
            case "auth/weak-password":
              console.log("pw must be at least 6 char");
              break;
            case "auth/email-already-in-use":
              console.log("email address is already used");
              break;
            default:
              console.log("u r sign uped bro ");
              break;
          }
        });
    }
  };

  return (
    <div className="signup">
      {loader === true ? <Loader /> : <div />}
      <div>
        <form className="signupForm">
          <label> Email Address:</label>
          <input
            className="signupinp"
            type="text"
            name="email"
            onChange={getInput}
          />
          <label> Password:</label>
          <input
            className="signupinp"
            type="password"
            name="password"
            onChange={getInput}
          />
          <label> Upload your profile picture here:</label>
          <br />
          <input type="file" />
          <button className="btn" onClick={createUser}>
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
