import React from "react";
import "./input.css";

export default function Input(props) {
  return (
    <div className="inp">
      <input
        className="input"
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}
