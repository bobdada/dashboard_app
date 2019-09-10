import React, { useContext, useState } from 'react'
import PropContext from '../contexts/PropContext'
import * as firebase from 'firebase'
import Users from './Users'
import H from './H'
import D from './D'


function Home() {
  const datas = useContext(PropContext)
  const [show, setShow] = useState(true)
  const logOut = () => {
    firebase.auth().signOut()
  }

  return (
    <div>
      <h2>Hi! Welcome to Dashboard</h2>
      {show === true ? (
        <div>
          Admins: <p>There are {datas.adminData.length} admins</p>
          Chats:<p>You currently have {datas.chatCount.length} chat </p>
          Friends:
          <p> You have {datas.friendsData.length} friends in your list</p>
        </div>
      ) : null}
      <div>
        <Users show={show} setShow={setShow} />
      </div>
      {/* <button className='btnLogout' onClick={logOut}>
        LogOut
      </button> */}

      <D>
        <div>
          <div>
            <p>hello daju</p>
            <div>
              <p>k xa khabar</p>
            </div>
          </div>
        </div>
      </D>

      {/* <H>
        <div>
          <div className="dv">
            <p className="test">
              <span>
                <p className="target" transform>H1 huna paro</p>
              </span>
            </p>
          </div>
        </div>
      </H> */}
    </div>
  )
}
export default Home
