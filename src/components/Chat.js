import React, { useState, useContext } from 'react'
import PropContext from '../contexts/PropContext'

import H from './H'


const Chat = () => {
  const chatCount = useContext(PropContext)
  const [inputs, setInputs] = useState({
    name: '',
    message: '',
    id: null
  })

  const addInput = () => {
    if (inputs.id === null) {
      chatCount.setChatCount([
        ...chatCount.chatCount,
        {
          name: inputs.name,
          message: inputs.message,
          id: getNewId()
        }
      ])
    } else {
      chatCount.chatCount.map((chats, i) => {
        if (chats.id === inputs.id) {
          chatCount.chatCount[i] = { ...inputs }
        }

        chatCount.setChatCount([...chatCount.chatCount])
      })
    }
    setInputs({
      name: '',
      message: '',
      id: null
    })
  }

  function getNewId() {
    if (chatCount.chatCount.length === 0) return 0
    return chatCount.chatCount[chatCount.chatCount.length - 1].id + 1
  }
  const getAdminData = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const editChat = r => {
    setInputs({
      name: r.name,
      message: r.message,
      id: r.id
    })
  }

  const deleteChat = index => {
    const arr = chatCount.chatCount.filter((b, ii) => index !== ii)
    chatCount.setChatCount(arr)
  }

  return (
    <div>
      {chatCount.chatCount.length === 0 ? null : (
        <table border='1'>
          <tr>
            <th>Friends</th>
            <th>Messages</th>
            <th />
            <th />
          </tr>
          {chatCount.chatCount.map((r, i) => {
            return (
              <tr>
                <td>{r.name}</td>
                <td>{r.message}</td>
                <td>
                  <button onClick={() => editChat(r)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteChat(i)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </table>
      )}
      <div>
        <p>Search for friends to chat</p>
        <label htmlFor=''>Name:</label>
        <input
          type='text'
          name='name'
          onChange={getAdminData}
          value={inputs.name}
        />
        <br />
        <label htmlFor=''>Message</label>
        <textarea
          cols='33'
          rows='8'
          name='message'
          onChange={getAdminData}
          value={inputs.message}
        />{' '}
        <br /> <br />
        <button className='bts' onClick={() => addInput()}>
          Proceed Chat
        </button>
      </div>
      <H>
        <div>

        </div>
      </H>
    </div>
  )
}
export default Chat
