import axios from "axios";

import { useEffect } from "react";
import { useState } from "react";
import { socket } from "../socket/socket";
import { currentUser } from "../utils/decodeToken";
const API_URL = import.meta.env.VITE_API_URL;
const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {
    if (!selectedUser || !message.trim()) return null;
    const getCurrentUser = currentUser();
    socket.emit("sendMessage", {
      sender: getCurrentUser.id,
      receiver: selectedUser._id,
      message,
    });
    setMessage("");
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    const user = currentUser();

    if (user) {
      socket.emit("onlineUser", user.id);
    }
  }, []);
  useEffect(() => {
    if (!selectedUser) return;
    const getcurrentUser = currentUser();

    socket.emit("joinRoom", {
      userId: getcurrentUser.id,
      otherUserId: selectedUser._id,
    });
  }, [selectedUser]);
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("newMessage");
  }, []);
  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessage = async () => {
      const getCurrentUser = currentUser();
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${API_URL}/api/auth/messages/${getCurrentUser.id}/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessages(res.data.data);
    };
    fetchMessage();
  }, [selectedUser]);
  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar - Users */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500">Online friends</p>
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold uppercase">
                {user.username.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-800">{user.username}</p>

                <p
                  className={`text-xs ${
                    user.isOnline ? "text-green-500" : "text-red-400"
                  }`}
                >
                  {user.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {selectedUser ? selectedUser.username : "Chat Window"}
          </h2>
          <p className="text-sm text-gray-500">
            {selectedUser
              ? "Start Chatting"
              : "Select a user to start chatting"}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => {
            const getCurrentUser = currentUser();

            const isMe = msg.sender?.toString() === getCurrentUser.id;

            return (
              <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs ${
                    isMe ? "bg-blue-600 text-white" : "bg-white shadow"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input box */}
        <div className="p-4 bg-white border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
