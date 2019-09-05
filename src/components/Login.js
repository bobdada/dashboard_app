import React, { useState, useContext } from "react";
import * as firebase from "firebase";

import Input from "./Input";
import LoginContext from "../contexts/LoginContext";

import "../App.css";
import Loader from "./Loader";
import SignUp from "./SignUp";

export default function Login() {
  const defaultInputs = {
    username: "",
    password: "",
  };
  const [inputs, setInputs] = useState(defaultInputs);
  const [loader, setLoader] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const login = useContext(LoginContext);

  const getInput = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const signUp = () => {
    setShowSignup(true);
  };
  const showLoader = () => {
    setLoader(true);
  };

  const validateInputs = () => {
    showLoader();
    if (inputs.username === "" || inputs.password === "") {
      return alert("Please fill the form");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(inputs.username, inputs.password)
        .then(users => {
          setLoader(false);
          console.log("thik xa ");
          //console.log(users);
          login.setLoginState("login");
        })
        .catch(e => {
          setLoader(false);
          console.log(e);
          switch (e.code) {
            case "auth/invalid-email":
              console.log("invalid email address");
              break;
            case "auth/user-not-found":
              console.log("email address not found");
              break;
            case "auth/wrong-password":
              console.log("wrongg password");
              break;
            default:
              console.log("fine bro");
              break;
          }
        });
    }
  };

  return (
    <div>
      {loader === true ? <Loader /> : <div></div>}
      <div className="App">
        <div className="container11">
          <div
            className="container22"
            style={{ display: showSignup === true ? "none" : "flex" }}
          >
            <div className="pp" />
            <div className="inputs">
              <Input
                type="text"
                name="username"
                placeholder="Email Address"
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
            Don't have an account
            <button onClick={signUp}>Sign Up</button>
          </div>
        </div>
        {showSignup === true ? <SignUp /> : null}
      </div>
    </div>
  );
}

// axios
// .get("https://5d664572520e1b00141ee08f.mockapi.io/api/v10/users")
// .then(function(response) {
//   setLoader(false);
//   if (
//     inputs.username === response.data[0].email &&
//     inputs.password === response.data[0].password
//   ) {
//     login.setLogin(true);
//   } else {
//     alert("Jo paye tehi le xirna paudaina ");
//   }
// });

// const db = firebase.firestore();
// db.collection("login")
//   .doc("logins")
//   .get()
//   .then(function(datas) {
//     setLoader(false);
//     if (
//       inputs.username === datas.data().email ||
//       inputs.username === datas.data().password
//     ) {
//       login.setLogin(true);
//     } else {
//       alert("Jo paye tehi le xirna paudaina ");
//     }
//     console.log(datas.data());
//   });
