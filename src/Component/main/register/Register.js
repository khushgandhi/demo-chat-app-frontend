import "./Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "../../../ApiUtill/apiCall";
function Register(props) {
  let navigate = useNavigate();
  const [text, setText] = useState("");
  return (
    <div className="register-box">
      <div className="content">Register Here</div>
      <input
        type="text"
        id="register-input"
        value={text}
        onChange={(event) => {
          // console.log(event.target.value);
          setText(event.target.value);
        }}
      ></input>
      <button
        id="register-button"
        onClick={() => {
          apiCall("register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: text }),
          })
            .then((resp) => resp.json())
            .then((resp) => {
              // console.log(resp);
              props.setSender(resp);
              navigate(`/chat/${resp.userId}`);
            })
            .catch((err) => console.log(err));
        }}
      >
        Start Chatting
      </button>
    </div>
  );
}

export default Register;
