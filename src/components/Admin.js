import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'

import './admin.css'
import AdminInput from './AdminInput'

export default function Admin () {
  const [apiData, setApiData] = useState([])
  const [loader, setLoader] = useState(false)
  const [adminInput, setAdminInput] = useState(false)

  const db = firebase.firestore()
  useEffect(() => {
    setLoader(true)
    db.collection('admins')
      .orderBy('timestamp')
      .onSnapshot(admin => {
        let admins = []
        admin.docs.forEach(d => {
          admins.push(d.data())
        })
        setApiData(admins)
        setLoader(false)
      })
  }, [])

  const [inputs, setInputs] = useState({
    name: '',
    post: '',
    age: '',
    id: null
  })

  const addInput = () => {
    setLoader(true)
    if (inputs.id === null) {
      console.log('on add')
      const docRef = db.collection('admins').doc()
      docRef
        .set({
          name: inputs.name,
          post: inputs.post,
          age: inputs.age,
          id: docRef.id,
          timestamp: new Date().getTime()
        })
        .then(function (response) {
          setLoader(false)
          setApiData([
            ...apiData,
            {
              name: inputs.name,
              post: inputs.post,
              age: inputs.age,
              id: docRef.id
            }
          ])
        })
    } else {
      apiData.map((a, i) => {
        if (a.id === inputs.id) {
          apiData[i] = { ...inputs }
          setApiData([...apiData])
          db.collection('admins')
            .doc(a.id)
            .update({
              name: inputs.name,
              post: inputs.post,
              age: inputs.age,
              id: inputs.id
            })
            .then(res => {
              console.log('successfully edited')
              setLoader(false)
            })
        }
      })
    }
    setInputs({
      name: '',
      post: '',
      age: '',
      id: null
    })
    setAdminInput(false)
  }

  const getAdminData = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const deleteAdmin = (r, i) => {
    setLoader(true)
    db.collection('admins')
      .doc(i)
      .delete()
      .then(function (response) {
        setLoader(false)
        console.log('successful')
      })
      .catch(err => {
        console.log(err)
      })
    let api = apiData.filter(a => a.id !== i)
    setApiData(api)
  }

  const editAdmin = (r, id) => {
    setAdminInput(true)
    setInputs({
      name: r.name,
      post: r.post,
      age: r.age,
      id: r.id
    })
  }

  const showAdminInput = () => {
    setAdminInput(true)
  }

  return (
    <div className='adminContainer'>
      <p>Ask Rule</p>
      <div>
        {loader === true ? (
          <div className='adminLoader' />
        ) : (
          <div>
            {apiData && apiData.length === 0 ? (
              <div>
                <h1> There is not any data</h1>
                <button
                  onClick={showAdminInput}
                  style={{
                    display: 'inline-block',
                    borderRadius: '50%',
                    height: '50px',
                    border: '1px solid blue',
                    color: 'blue'
                  }}
                >
                  Add Data
                </button>
              </div>
            ) : (
              <div>
                <table className='table'>
                  <tr>
                    <th>Name of Admin</th>
                    <th> Post of Admin </th>
                    <th> Age of admin </th>
                    <th> Id </th>
                  </tr>
                  {apiData.map((r, i) => {
                    return (
                      <tr>
                        <td>{r.name}</td>
                        <td>{r.post}</td>
                        <td>{r.age}</td>
                        <td>{r.id}</td>

                        <button onClick={() => editAdmin(r, r.id)}>Edit</button>
                        <button onClick={() => deleteAdmin(r, r.id)}>
                          Delete
                        </button>
                      </tr>
                    )
                  })}
                  <button
                    onClick={showAdminInput}
                    style={{
                      display: 'inline-block',
                      borderRadius: '50%',
                      height: '50px',
                      border: '1px solid blue',
                      color: 'blue',
                      position: 'relative',
                      top: '20%',
                      margin: '30px'
                    }}
                  >
                    Add Data
                  </button>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {adminInput === true ? (
        <AdminInput
          inputs={inputs}
          addInput={addInput}
          getAdminData={getAdminData}
          setAdminInput={setAdminInput}
        />
      ) : null}
    </div>
  )
}
