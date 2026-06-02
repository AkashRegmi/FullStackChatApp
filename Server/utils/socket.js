import User from "../models/user.js";
import Message from "../models/message.js";
const onlineUsers = new Map();
export const socketServer = (io) => {
  io.on("connection", (socket) => {
    console.log("connect to the socket", socket.id);
    socket.on("onlineUser", async (userId) => {
      onlineUser.set(userId, socket.id);
      await User.findByIdAndUpdate(userId, {
        isOnline: true,
      });
      io.emit("onlineUsers", Array.from(onlineUser.keys()));
    });
    socket.on("joinRoom", ({ userId, otherUserId }) => {
      const roomId = [userId, otherUserId].sort().join("_");
      socket.join(roomId);
    });
    socket.on("sendMessage", async ({ sender, receiver, message }) => {
      const roomId = [sender, receiver].sort().join("_");

      const newMessage = await Message.create({
        sender,
        receiver,
        room: roomId,
        message,
      });

      io.to(roomId).emit("newMessage", newMessage);
    });
    socket.on("typing", ({ roomId, user }) => {
      socket.to(roomId).emit("typing", user);
    });
    socket.on("stopTyping", ({ roomId }) => {
      socket.to(roomId).emit("stopTyping");
    });
    socket.on("disconnect", async () => {
      let userId;

      for (let [key, value] of onlineUsers.entries()) {
        if (value === socket.id) {
          userId = key;
          onlineUsers.delete(key);
          break;
        }
      }

      if (userId) {
        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeeen: new Date(),
        });
      }

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });
};
