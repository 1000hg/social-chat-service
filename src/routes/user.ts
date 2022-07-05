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

userRouter.post("/signup", userController.signUp);

userRouter.post("/login", userController.login);

export { userRouter };