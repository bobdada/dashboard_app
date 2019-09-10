import React, { useState, useContext, useEffect } from 'react'
import * as firebase from 'firebase'

import LoginContext from '../contexts/LoginContext'

const defaultUser = {
  name: '',
  address: '',
  phone: '',
  email: '',
  imageUrl: null
}

export default function Users(props) {
  const db = firebase.firestore()
  const [user, setUser] = useState(defaultUser)
  useEffect(() => {
    const userId = firebase.auth().currentUser.uid
    db.collection('users')
      .doc(userId)
      .get()
      .then(loginUser => {
        // console.log(loginUser.data())
        if (loginUser.exists) setUser({ ...user, ...loginUser.data() })
      })
  }, [])
  const [profilePic, setProfilePic] = useState(null)
  const [loader, setLoader] = useState(false)
  const googlePic = useContext(LoginContext)

  const showUsers = () => {
    const userId = firebase.auth().currentUser.uid
    setLoader(true)
    props.setShow(false)
    const storageRef = firebase.storage().ref()
    storageRef
      .listAll()
      .then(res => {
        console.log(res.items)
        const storagePic = res.items.filter(function (itemRef) {
          return itemRef.name === `${userId}.jpg`
        })
        console.log(storagePic)
        if (storagePic.length === 0) {
          setProfilePic(googlePic.googlePic)
          console.log(googlePic)
          setLoader(false)
        } else {
          storageRef
            .child(`${userId}.jpg`)
            .getDownloadURL()
            .then(img => {
              console.log(img)
              setProfilePic(img)
              setLoader(false)
            })
        }
        db.collection('users')
          .doc(userId)
          .get()
          .then(user => {
            console.log(user.data())
            let users = user.data()
            setUser({
              name: users.name,
              address: users.address,
              phone: users.phone,
              email: users.email,
              imageUrl: users.imageUrl
            })
            user.phone && setLoader(false)
          })
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      })
  }

  return (
    <div>
      {loader === true ? (
        <div className='adminLoader' />
      ) : (
          <div>
            <div>
              {
                <img
                  src={profilePic}
                  style={{ height: '150px', width: '200px' }}
                  alt=' '
                />
              }
            </div>
            <div>
              {profilePic && (
                <ul>
                  <li> Name: {user.name} </li>
                  <li> Address: {user.address}</li>
                  <li> Phone: {user.phone} </li>
                  <li> Email: {user.email}</li>
                </ul>
              )}
            </div>
            {props.show === true ? (
              <button className='btn' onClick={showUsers}>
                Show User
            </button>
            ) : null}
          </div>
        )}
    </div>
  )
}
