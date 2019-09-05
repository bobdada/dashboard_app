import React, { useState } from "react";

import Chat from "./Chat";
import Home from "./Home";
import Admin from "./Admin";
import Friends from "./Friends";
import NavComponent from "./NavComponent";
import PropContext from "../contexts/PropContext";

import "./dashboard.css";

export default function Dashboard() {
  const [display, setDisplay] = useState("home");
  const [chatCount, setChatCount] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const [sidebar, setSidebar] = useState(true);

  function renderRoute() {
    switch (display) {
      case "admin":
        return <Admin />;
      case "friends":
        return <Friends />;
      case "chat":
        return <Chat />;
      default:
        return <Home />;
    }
  }
  function showSidebar() {
    if (sidebar === false) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  }

  return (
    <div className="container">
      <div className="navbar">
        <nav>
          <ul className="lists">
            <li>
              <div className="hamburger" onClick={showSidebar}>
                <div className="hb"></div>
                <div className="hb"></div>
                <div className="hb"></div>
              </div>
            </li>
            <li>
              <h1>Hamro Dashboard</h1>
            </li>
          </ul>
        </nav>
      </div>
      <div className="App1">
        <PropContext.Provider
          value={{
            chatCount,
            setChatCount,
            adminData,
            setAdminData,
            friendsData,
            setFriendsData,
          }}
        >
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <NavComponent
                setDisplay={setDisplay}
                display={display}
                sidebar={sidebar}
              />
              <div className="div2">{renderRoute()}</div>
            </div>
          </div>
        </PropContext.Provider>
      </div>
    </div>
  );
}
