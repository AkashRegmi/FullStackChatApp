import jwt from "jsonwebtoken";
import User from "../models/user.js";

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket?.handshake?.auth?.token;

    if (!token) {
      return next(new Error("No token provided"));
    }
    console.log("Received Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;

    next();
  } catch (error) {
    next(new Error("Authentication failed"));
  }
};

export default socketAuthMiddleware;
