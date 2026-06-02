import { io } from "socket.io-client";

export const socket = io("http://localhost:4004", {
  autoConnect: false,
});
