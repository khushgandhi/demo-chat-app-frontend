import "./App.css";
import Header from "./Component/header/Header";
import React, { useState } from "react";
import ChatRoom from "./Component/main/chat-room/ChatRoom";
import Register from "./Component/main/register/Register";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

function App() {
  const [sender,setSender] = useState(null);
  const registerComp = <Register setSender={setSender}/>
  const AppRoutes = () => {
    let routes = useRoutes([
      { path: "/", element: registerComp },
      { path: "/chat/:senderId", element: <ChatRoom sender={sender}/> },
      { path: "/*", element: registerComp },
    ]);
    return routes;
  };
  return (
    <div style={{ fontSize: "1rem", height: "500px" }}>
      <Router>
      <Header />
      <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
