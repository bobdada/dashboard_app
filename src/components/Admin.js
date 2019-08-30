import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import PropContext from "../contexts/PropContext";
import "./admin.css";

export default function Admin() {
  const data = useContext(PropContext);

  const [apiData, setApiData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios
      .get("https://5d664572520e1b00141ee08f.mockapi.io/api/v10/admins")
      .then(function(response) {
        setApiData(response.data);
        setLoader(false);
      });
  }, []);

  const [inputs, setInputs] = useState({
    name: "",
    post: "",
    age: "",
    id: null
  });

  const addInput = () => {
    setLoader(true);
    if (inputs.id === null) {
      axios
        .post("https://5d664572520e1b00141ee08f.mockapi.io/api/v10/admins", {
          name: inputs.name,
          post: inputs.post,
          age: inputs.age
        })
        .then(function(response) {
          setLoader(false);
          console.log(response);
          setApiData([...apiData, response.data]);
        });
    } else {
      apiData.map((a, i) => {
        if (a.id === inputs.id) {
          apiData[i] = { ...inputs };
          console.log(apiData[i]);
          setApiData([...apiData]);
          var link = `https://5d664572520e1b00141ee08f.mockapi.io/api/v10/admins/${inputs.id}`;
          console.log(link);
          axios.put(link, { ...inputs }).then(function(response) {
            setLoader(false);
            console.log(response);
          });
        }
      });
    }
    setInputs({
      name: "",
      post: "",
      age: "",
      id: null
    });
  };

  const getAdminData = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const deleteAdmin = (r, i) => {
    setLoader(true);
    var link = `https://5d664572520e1b00141ee08f.mockapi.io/api/v10/admins/${r.id}`;
    console.log(link);
    axios
      .delete(link)
      .then(function(response) {
        setLoader(false);
        console.log(response);
        console.log(apiData);
      })
      .catch(err => {
        console.log(err);
      });
    let api = apiData.filter((a, ii) => {
      return ii !== i;
    });
    setApiData(api);
  };

  const editAdmin = (r, id) => {
    setInputs({
      name: r.name,
      post: r.post,
      age: r.age,
      id: r.id
    });
  };

  return (
    <div>
      <div>{loader === true ? <div className="adminLoader" /> : <div />}</div>
      {apiData && apiData.length === 0 ? null : (
        <table className="table">
          <tr>
            <th>Name of Admin</th>
            <th>Post of Admin</th>
            <th>Age of admin</th>
          </tr>
          {apiData.map((r, i) => {
            return (
              <tr>
                <td>{r.name}</td>
                <td>{r.post}</td>
                <td>{r.age}</td>

                <button onClick={() => editAdmin(r, r.id)}>Edit</button>
                <button onClick={() => deleteAdmin(r, i)}>Delete</button>
              </tr>
            );
          })}
        </table>
      )}
      <div>
        <p>Add Admins</p>
        <label htmlFor="">Name:</label>
        <input
          type="text"
          name="name"
          onChange={getAdminData}
          value={inputs.name}
        />
        <label htmlFor="">Post:</label>
        <input
          type="text"
          name="post"
          onChange={getAdminData}
          value={inputs.post}
        />
        <label htmlFor="">Age:</label>
        <input
          type="text"
          name="age"
          onChange={getAdminData}
          value={inputs.age}
        />
        <br /> <br />
        <button className="bts" onClick={() => addInput()}>
          Add Admin
        </button>
      </div>
    </div>
  );
}
