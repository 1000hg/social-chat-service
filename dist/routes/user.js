"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../views/login.html"));
});
userRouter.get("/signup", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../views/sign_up.html"));
});
userRouter.get("/user/userList", (req, res) => {
    if (req.session.isLogined)
        res.sendFile(path_1.default.join(__dirname, "../views/user_list.html"));
    else
        res.sendFile(path_1.default.join(__dirname, "../views/login.html"));
});
userRouter.post("/signup", user_controller_1.default.signUp);
userRouter.post("/login", user_controller_1.default.login);
userRouter.get("/logout", user_controller_1.default.logout);
userRouter.get("/user/getUser", user_controller_1.default.getUser);
userRouter.get("/user/getSomeUser", user_controller_1.default.getSomeUser);
userRouter.get("/user/getUserList", user_controller_1.default.getUserList);
