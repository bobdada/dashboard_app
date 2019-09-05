import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBYhrsZTVXPTWslzFNvyl1ZPY_lllIUj8s",
  authDomain: "dashboard-2a2ac.firebaseapp.com",
  databaseURL: "https://dashboard-2a2ac.firebaseio.com",
  projectId: "dashboard-2a2ac",
  storageBucket: "dashboard-2a2ac.appspot.com",
  messagingSenderId: "168736736396",
  appId: "1:168736736396:web:11220cf99907851a",
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
