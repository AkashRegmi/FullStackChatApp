import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import socketAuthMiddleware from "./middleWare/socketMiddleware.js";
import { socketServer } from "./utils/socket.js";
dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://full-stack-chat-app-pi-gilt.vercel.app",
    ],
  }),
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
  },
});
socketServer(io);

app.get("/", (req, res) => {
  res.send("Server running");
});
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
