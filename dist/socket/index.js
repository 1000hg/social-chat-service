"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
let interval = 3000;
let user_list = [];
function webSocket(httpServer) {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("[Socket] New client connected");
        socket.on('joinRoom', (data) => {
            if (!user_list.includes(data.user_id))
                user_list.push(data.user_id);
            socket.join(data.room);
            io.to(data.room).emit('joinRoom', { data, "user_list": user_list });
        });
        socket.on('leaveRoom', (data) => {
            user_list = user_list.filter((element) => element !== data.user_id);
            socket.leave(data.room);
            io.to(data.room).emit('leaveRoom', { data, "user_list": user_list });
        });
        socket.on("disconnect", () => {
            console.log("user disconnect", socket.id);
        });
        socket.on('chat-msg', (data) => {
            io.emit('chat-msg', data);
        });
    });
}
exports.default = webSocket;
