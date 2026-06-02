import { io } from "socket.io-client";
const SOCKET_URL = "http://localhost:4004";
const token = localStorage.getItem("accessToken");
export const socket = io(SOCKET_URL, {
  autoConnect: false, 
});
