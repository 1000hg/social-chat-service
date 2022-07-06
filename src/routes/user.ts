import { Router } from "express";
import path from "path";
import userController from "../controllers/user-controller"

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

userRouter.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/sign_up.html"));
})

userRouter.get("/user/userList", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/user_list.html"));
})

userRouter.post("/signup", userController.signUp);

userRouter.post("/login", userController.login);

userRouter.get("/logout", userController.logout);

userRouter.get("/user/getUser", userController.getUser);

userRouter.get("/user/getUserList", userController.getUserList);

export { userRouter };