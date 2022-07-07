import { Router } from "express";
import path from "path";
import friendController from "../controllers/friend-controller"

const friendRouter = Router();

friendRouter.get("/", (req, res) => {
  if (req.session.isLogined)
    res.sendFile(path.join(__dirname, "../views/friend.html"));
  else
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

friendRouter.post("/addFriend", friendController.insertFriend);

friendRouter.get("/getRequestFriendList", friendController.getRequestFriendList);

friendRouter.get("/getResponseFriendList", friendController.getResponseFriendList);

friendRouter.post("/updateResponseFriendList", friendController.updateResponseFriendList);

friendRouter.get("/getFriendList", friendController.getFriendList);

friendRouter.post("/deleteFriend", friendController.deleteFriend);

export { friendRouter };