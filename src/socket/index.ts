import http from "http";
import { Server } from "socket.io";
import { Message } from '../modules/messageModules'

let interval: number = 3000;

export default function webSocket(httpServer: http.Server) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("[Socket] New client connected");

    socket.on("disconnect", () => console.log("user disconnect", socket.id));
  });
}