import "./MessageBox.css";

import React, { useEffect, useRef } from "react";
import Message from "./Message/Message";

export default function MessageBox(props) {
  const messagesEndRef = useRef(null);
  const getMessages = (messages) => {
    console.log("getMessages..");
    console.log(messages);
    return messages.map((message, index) => {
      return (
        <Message
          messageType={message.sentByYou ? "SENT" : "RECIEVED"}
          messageText={message.message}
        />
      );
    });
  };

  useEffect(() => {
    messagesEndRef &&
      messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [props.messages]);
  const getEndMessageDiv = () => {
    return (
      <div ref={messagesEndRef}></div>
    );
  };
  const messageBoxContent = props.reciever ? (
    getMessages(props.messages)
  ) : (
    <div className="NoParticipantSelected">
      Please select participant to chat
    </div>
  );

  return (
    <div className="MessageBox">
      <div className="RecipientName">
        <span>{props.reciever ? props.reciever.name : ""}</span>
      </div>
      {messageBoxContent}
      {getEndMessageDiv()}
    </div>
  );
}
