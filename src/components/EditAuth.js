import React, { useState, useEffect, useRef } from 'react'
import * as firebase from 'firebase'

import Loader from './Loader'
import './Friends.css'

const defaultUser = {
  name: '',
  address: '',
  phone: '',
  email: '',
  image: '',
  imageUrl: ''
}

export default function EditAuth() {

  const _firestore = firebase.firestore()
  const userId = firebase.auth().currentUser.uid
  let [userData, setUserData] = useState({ ...defaultUser })
  const [loader, setLoader] = useState(false)

  const fileRef = useRef()
  useEffect(() => {
    _firestore
      .collection('users')
      .doc(userId)
      .get()
      .then(loginUser => {
        console.log(loginUser.data())
        if (loginUser.exists) setUserData({ ...userData, ...loginUser.data() })
      })
  }, [])
  const showLoader = () => {
    setLoader(true)
  }

  const handleInputs = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleForm = e => {
    showLoader()
    e.preventDefault()
    let file = userData.image
    const picRef = firebase
      .storage()
      .ref()
      .child(`${userId}.jpg`)
    if (file) {
      picRef.put(file).then(filee => {
        console.log(filee)
        console.log('uploaded')
        setLoader(false)
        const storageRef = firebase
          .storage()
          .ref()
          .child(`${userId}.jpg`)
        storageRef.getDownloadURL().then(img => {
          console.log(img)
          // setUserData({ ...userData, imageUrl: img });
          // console.log(userData);
          _firestore
            .collection('users')
            .doc(userId)
            .set({
              name: userData.name,
              address: userData.address,
              phone: userData.phone,
              imageUrl: img,
              email: userData.email
            })
            .then(() => {
              alert('success')
              setUserData({ ...userData })
            })
            .catch(e => console.log(e))
        })
      })
    } else {
      _firestore
        .collection('users')
        .doc(userId)
        .set({
          name: userData.name,
          address: userData.address,
          phone: userData.phone,
          imageUrl: userData.imageUrl,
          email: userData.email
        })
        .then(() => {
          alert('success')
          setUserData({ ...userData })
        })
        .catch(e => console.log(e))
    }
  }

  function handleImage(e) {
    const image = e.target.files[0]
    let imageLocal = URL.createObjectURL(image)
    // setUserData({ ...userData });
    setUserData({ ...userData, image, imageUrl: imageLocal })

    // console.log(imageUrl);
  }
  return (
    <div>
      {loader === true ? <Loader /> : <div />}
      <p>Click on profile pic to edit </p>
      <div
        onClick={() => {
          fileRef.current.click()
        }}
        style={{
          height: '170px',
          width: '220px',
          display: 'inline-block',
          cursor: 'pointer',
          backgrounColor: 'black'
        }}
      >
        <div className='browse'>
          <label for='file' class='btn-2'>
            <input
              ref={fileRef}
              type='file'
              id='file'
              onChange={handleImage}
            // style={{ display: "none" }}
            />
          </label>
        </div>
        {userData.imageUrl === null ? (
          <p style={{ 'text-align': 'center' }}>No photo</p>
        ) : (
            <img className='editPic' src={userData.imageUrl} alt=' ' />
          )}
      </div>
      <p>Edit your profile</p>
      <div>
        <form className='fip'>
          <label className='fi' htmlFor=''>
            Name:
          </label>
          <input
            className='fi'
            type='text'
            placeholder='name'
            name='name'
            onChange={handleInputs}
            value={userData.name}
          />
          <label className='fi' htmlFor=''>
            Address:
          </label>
          <input
            className='fi'
            type='text'
            placeholder='address'
            name='address'
            onChange={handleInputs}
            value={userData.address}
          />
          <label className='fi' htmlFor=''>
            Phone Number:
          </label>
          <input
            className='fi'
            type='text'
            placeholder='phone'
            name='phone'
            onChange={handleInputs}
            value={userData.phone}
          />
          <label className='fi' htmlFor=''>
            Email Address:
          </label>
          <input
            className='fi'
            type='text'
            placeholder='email'
            name='email'
            value={userData.email}
            readonly
          />

          <button className='bts' onClick={handleForm}>
            Edit profile
          </button>
          <br />
        </form>
      </div>
    </div>
  )
}
