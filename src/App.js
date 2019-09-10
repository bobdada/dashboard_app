import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import LoginContext from './contexts/LoginContext'

import Loader from './components/Loader'
import * as firebase from 'firebase'

function App() {
  const [loginState, setLoginState] = useState(null)
  const [googlePic, setGooglePic] = useState(null)
  function routeLogin() {
    switch (loginState) {
      case 'login':
        return <Dashboard />
      case 'logout':
        return <Login />
      default:
        return <Loader />
      // console.log("hey");
    }
  }
  firebase.auth().onAuthStateChanged(user => {
    if (user === null) {
      setLoginState('logout')
    } else if (user !== null) {
      setLoginState('login')
    }
  })
  return (
    <LoginContext.Provider
      value={{
        googlePic,
        setGooglePic,
        setLoginState,
        loginState
      }}
    >
      <div>{routeLogin()}</div>
    </LoginContext.Provider>
  )
}
export default App
