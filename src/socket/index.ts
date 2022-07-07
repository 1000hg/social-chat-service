import http from "http";
import { Server } from "socket.io";

let interval: number = 3000;

export default function webSocket(httpServer: http.Server) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {

    console.log("[Socket] New client connected");

    socket.on('joinRoom', (data) => {
      socket.join(data.room)
      io.to(data.room).emit('joinRoom', data);
    });

    socket.on('leaveRoom', (data) => {
      socket.leave(data.room)
      io.to(data.room).emit('leaveRoom', data);
    });
  

    socket.on("disconnect", () => {
      console.log("user disconnect", socket.id)}
    );

    socket.on('chat-msg', (data) => {
      io.emit('chat-msg', data);
    });
  });
}