import React from "react";
import "./Message.css";
export default function Message(props) {
  return (
    <div className="MessageContainer">
      <div
        className={
          props.messageType === "SENT" ? "sentMessage" : "recievedMessage"
        }
      >
        <span>{props.messageText}</span>
      </div>
      <br/>
      <br/>
    </div>
  );
}
