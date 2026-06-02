import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Chat = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:4004/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    };
    fetchUser();
  }, []);
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
          <h2 className="text-xl font-bold text-gray-800">Chat Window</h2>
          <p className="text-sm text-gray-500">
            Select a user to start chatting
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {/* Incoming message */}
          <div className="flex justify-start">
            <div className="bg-white shadow px-4 py-2 rounded-2xl max-w-xs">
              Hey 👋 how are you?
            </div>
          </div>

          {/* Outgoing message */}
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl max-w-xs">
              I’m good, working on chat app 🚀
            </div>
          </div>
        </div>

        {/* Input box */}
        <div className="p-4 bg-white border-t flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
