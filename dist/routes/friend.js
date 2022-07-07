"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRouter = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const friend_controller_1 = __importDefault(require("../controllers/friend-controller"));
const friendRouter = (0, express_1.Router)();
exports.friendRouter = friendRouter;
friendRouter.get("/", (req, res) => {
    if (req.session.isLogined)
        res.sendFile(path_1.default.join(__dirname, "../views/friend.html"));
    else
        res.sendFile(path_1.default.join(__dirname, "../views/login.html"));
});
friendRouter.post("/addFriend", friend_controller_1.default.insertFriend);
friendRouter.get("/getRequestFriendList", friend_controller_1.default.getRequestFriendList);
friendRouter.get("/getResponseFriendList", friend_controller_1.default.getResponseFriendList);
friendRouter.post("/updateResponseFriendList", friend_controller_1.default.updateResponseFriendList);
friendRouter.get("/getFriendList", friend_controller_1.default.getFriendList);
friendRouter.post("/deleteFriend", friend_controller_1.default.deleteFriend);
