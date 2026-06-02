import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { socket } from "../socket";
import { UserList } from "../components/UserList";
import { MessageList } from "../components/MessageList";
import MessageInput from "../components/MessageInput";

export const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("Socket ID:", socket.id);

    const handler = (data) => {
      console.log("Received:", data);
      setMessages((prev) => [...prev, data]);
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, []);
  return (
    <div className="chat-container">
      <aside className="sidebar">
        <UserList users={users} />
      </aside>

      <main className="chat-main">
        <div className="chat-header">
          <h2>Chat Room</h2>
        </div>

        <MessageList messages={messages} />

        <MessageInput />
      </main>
    </div>
  );
};
