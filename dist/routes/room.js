"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRouter = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const room_controller_1 = __importDefault(require("../controllers/room-controller"));
const roomRouter = (0, express_1.Router)();
exports.roomRouter = roomRouter;
roomRouter.get("/", (req, res) => {
    if (req.session.isLogined)
        res.sendFile(path_1.default.join(__dirname, "../views/room.html"));
    else
        res.sendFile(path_1.default.join(__dirname, "../views/login.html"));
});
roomRouter.get("/list", room_controller_1.default.roomList);
roomRouter.post("/updateRoom", room_controller_1.default.updateRoom);
roomRouter.get("/chat/:room_seq", (req, res) => {
    if (req.session.isLogined)
        res.sendFile(path_1.default.join(__dirname, "../views/chat.html"));
    else
        res.sendFile(path_1.default.join(__dirname, "../views/login.html"));
});
roomRouter.get("/chat/:from_user/:to_user", (req, res) => {
    if (req.session.isLogined)
        res.sendFile(path_1.default.join(__dirname, "../views/dm.html"));
    else
        res.sendFile(path_1.default.join(__dirname, "../views/login.html"));
});
