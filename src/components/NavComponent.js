import React from "react";
const NavComponent = props => {
  return (
    <div
      className="div1"
      style={{
        transform: props.sidebar === false ? "translateX(-100%)" : "none",
      }}
    >
      <nav>
        <ul className="Li">
          <Li name="home" {...props} />
          <Li name="admin" {...props} />
          <Li name="friends" {...props} />
          <Li name="chat" {...props} />
          <Li name="edit profile" {...props} />
        </ul>
      </nav>
    </div>
  );
};

const Li = props => {
  return (
    <li
      className="b1 bh"
      onClick={() => props.setDisplay(props.name)}
      style={{
        backgroundColor: props.display === props.name ? "white" : "blue",
      }}
    >
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </li>
  );
};

export default NavComponent;
