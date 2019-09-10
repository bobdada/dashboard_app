import React, { useState, useContext } from 'react'
import * as firebase from 'firebase'
import LoginContext from '../contexts/LoginContext'

import Loader from './Loader'

export default function SignUp(props) {
  const defaultInputs = {
    email: '',
    password: '',
    image: ''
  }
  const [inputs, setInputs] = useState(defaultInputs)
  const [loader, setLoader] = useState(false)
  const [profilePic, setProfilePic] = useState(null)
  const login = useContext(LoginContext)
  const closeSignup = () => {
    props.setShowSignup(false)
  };
  const getInput = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const showLoader = () => {
    setLoader(true)
  }

  const createUser = e => {
    showLoader()
    e.preventDefault()
    const _firestore = firebase.firestore()
    if (inputs.username === '' || inputs.password === '') {
      alert('Please fill the form')
      setLoader(false)
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(inputs.email, inputs.password)
        .then(newUser => {
          console.log(newUser)
          const userId = firebase.auth().currentUser.uid
          console.log(newUser.user)
          const docRef = _firestore.collection('users').doc(userId)
          docRef.set({
            email: inputs.email,
            // timestamp: new Date().getTime()
          })
          setLoader(false)
          console.log('thik xa ')
          // console.log(users);
          login.setLoginState('login')
        })
        .catch(e => {
          setLoader(false)
          console.log(e)
          switch (e.code) {
            case 'auth/invalid-email':
              console.log('please enter email address')
              break
            case 'auth/weak-password':
              console.log('pw must be at least 6 char')
              break
            case 'auth/email-already-in-use':
              console.log('email address is already used')
              break
            default:
              console.log('u r sign uped bro ')
              break
          }
        })
    }

  }
  const handlepp = (e) => {
    const image = e.target.file[0]
    setInputs({ ...inputs, image })
  }

  return (
    <div className='signup'>
      {loader === true ? <Loader /> : <div />}
      <div>
        <button className="inputClose" onClick={closeSignup}>
          close
        </button>
        {/* <div className="signupPP">
          <img src=".../pic/pp.jpg" alt="upload pic" style={{ height: "100px", width: "100px" }} />
        </div> */}
        <form className='signupForm'>
          <label> Name:</label>
          <input
            className='signupinp'
            type='text'
            name='name'
            onChange={getInput}
          />
          <label> Email Address:</label>
          <input
            className='signupinp'
            type='text'
            name='email'
            onChange={getInput}
          />
          <label> Password:</label>
          <input
            className='signupinp'
            type='password'
            name='password'
            onChange={getInput}
          />
          <label> Address:</label>
          <input
            className='signupinp'
            type='text'
            name='address'
            onChange={getInput}
          />
          <label>Phone Number:</label>
          <input
            className='signupinp'
            type='text'
            name='phone'
            onChange={getInput}
          />
          <label> Upload your profile picture here:</label>
          <br />
          <input type='file' onChange={handlepp} />
          <button className='btn' onClick={createUser}>
            SignUp
          </button>
        </form>
      </div>
    </div>
  )
}
