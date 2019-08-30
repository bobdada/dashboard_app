import React, { useState, useContext } from 'react';
import './Friends.css'
import PropContext from '../contexts/PropContext'


const defaultInputs = {
    name: '',
    address: '',
    phone: '',
    email: '',
    image: null

};

const Friends = () => {
    const data = useContext(PropContext)
    const [inputs, setInputs] = useState(defaultInputs)
    const [friends, setFriends] = useState([])
    const handleInputs = (e) => {
        setInputs({
            ...inputs, [e.target.name]: [e.target.value]
        })
    }
    const handleForm = (e) => {
        e.preventDefault();
        setFriends([...friends, inputs])
        data.setFriendsData([...data.friendsData, inputs])
        setInputs({ ...defaultInputs })
    }
    const setPicture = (e) => {
        setInputs({ ...inputs, image: e.target.files[0] })
        console.log(e.target.files)
    }
    return (
        <div >
            <p>Add the friends to your list</p>
            <div>
                <form className="fip" >
                    <label className="fi" htmlFor="">Name:</label>
                    <input className="fi" type="text" placeholder="name" name="name" onChange={handleInputs} value={inputs.name} /> <br />
                    <label className="fi" htmlFor="">Address:</label>
                    <input className="fi" type="text" placeholder="address" name="address" onChange={handleInputs} value={inputs.address} /> <br />
                    <label className="fi" htmlFor="">Phone Number:</label>
                    <input className="fi" type="text" placeholder="phone" name="phone" onChange={handleInputs} value={inputs.phone} /> <br />
                    <label className="fi" htmlFor="">email-address:</label>
                    <input className="fi" type="text" placeholder="email" name="email" onChange={handleInputs} value={inputs.email} /> <br />
                    <label className="fi" htmlFor="">Upload Photo:</label>
                    <input type="file" name="pic" name="pic" onChange={setPicture} /> <br /> <br />
                    <div>
                        {inputs.image && <img src={URL.createObjectURL(inputs.image)} height="150px" width="150px" alt="fsef" ></img>}
                    </div>
                    <button className="bts" onClick={handleForm}> Add Friend</button> <br />
                </form>

            </div>

            <div className="div4">
                {data.friendsData.map(a => {
                    let fileUrl = null;
                    if (a.image) {
                        fileUrl = URL.createObjectURL(a.image);
                        console.log(fileUrl)
                    }
                    return (
                        <div className="div3">
                            <div>
                                {fileUrl && <img src={fileUrl} alt="" height="180px" width="170px"></img>}
                            </div>
                            <div className="div5">
                                <li>{a.name}</li>
                                <li>{a.address}</li>
                                <li>{a.phone}</li>
                                <li>{a.email}</li>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div >

    )
}
export default Friends;