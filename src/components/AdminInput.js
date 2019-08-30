import React from "react";

export default function Loader(props) {
  return (
    <div className="adminInputDiv">
      <div className="fip popup">
        <h3>Enter the admin to add</h3>
        <label htmlFor="">Name:</label>
        <input
          type="text"
          name="name"
          onChange={props.getAdminData}
          value={props.inputs.name}
        />{" "}
        <br />
        <br />
        <label htmlFor="">Post:</label>
        <input
          type="text"
          name="post"
          onChange={props.getAdminData}
          value={props.inputs.post}
        />
        <br />
        <br />
        <label htmlFor="">Age:</label>
        <input
          type="text"
          name="age"
          onChange={props.getAdminData}
          value={props.inputs.age}
        />
        <br /> <br />
        <button className="bts" onClick={() => props.addInput()}>
          Add Admin
        </button>
      </div>
    </div>
  );
}
