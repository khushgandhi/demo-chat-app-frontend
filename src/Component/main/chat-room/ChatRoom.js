import "./ChatRoom.css";
import React, { useEffect, useState } from "react";
import LoadAndSearch from "./Search/LoadAndSearch";
import MessageBox from "./MessageBox/MessageBox";
import MessageTextBox from "./MessageTextBox/MessageTextBox";
import apiCall from "../../../ApiUtill/apiCall";
import { useNavigate } from "react-router-dom";
import SearchAndLoad from "./Search/SearchAndLoad";
function ChatRoom(props) {
  const [reciever, setReciever] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.sender) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      console.log(reciever);
      if (!reciever) {
        return;
      }
      apiCall(`messages/${props.sender.userId}/${reciever.userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("Messages...");
          console.log(resp);
          setMessages((prevMsgs) => {
            if (resp.length > prevMsgs.length) {
              return [...prevMsgs, ...resp.slice(prevMsgs.length, resp.length)];
            } else {
              return prevMsgs;
            }
          });
        });
    }, 5000);
    return () => {
      clearInterval(intervalRef);
    };
  }, [reciever]);

  useEffect(() => {
    if (reciever) {
      apiCall(`messages/${props.sender.userId}/${reciever.userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("Messages...");
          console.log(resp);
          setMessages(resp);
        });
    }
  }, [reciever]);
  const sendMessage = (msgText) => {
    if (msgText) {
      apiCall("send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msgText,
          senderId: props.sender.userId,
          recieverId: reciever.userId,
        }),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Can't send the message !!");
        })
        .then((resp) => {
          setMessages((prevMessages) => [...prevMessages, resp]);
        })
        .catch((ex) => {
          setMessages([]);
          console.log(ex);
        });
    }
  };
  return (
    <div style={{ height: "100%" }}>
      <div className="Search">
        <SearchAndLoad setReciever={setReciever}></SearchAndLoad>
        {/* <LoadAndSearch setReciever={setReciever}></LoadAndSearch> */}
      </div>

      <div className="ChatRoomMessageBox">
        <MessageBox
          reciever={reciever}
          sender={props.sender}
          messages={messages}
        />
        <MessageTextBox sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;
