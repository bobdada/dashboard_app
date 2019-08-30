import React, { useContext } from "react";
import PropContext from "../contexts/PropContext";
import loginContext from "../contexts/LoginContext";

const Home = pops => {
  const datas = useContext(PropContext);
  const login = useContext(loginContext);
  const logOut = () => {
    login.setLogin(false);
  };
  return (
    <div>
      <h2>Hi! Welcome to Dashboard</h2>
      Admins: <p>There are {datas.adminData.length} admins</p>
      Chats:<p>You currently have {datas.chatCount.length} chat </p>
      Friends:<p> You have {datas.friendsData.length} friends in your list</p>
      <button className="btn" onClick={logOut}>
        LogOut
      </button>
    </div>
  );
};
export default Home;
