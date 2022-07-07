import { Router } from "express";
import path from "path";
import roomController from "../controllers/room-controller"

const roomRouter = Router();

roomRouter.get("/", (req, res) => {
  if (req.session.isLogined)
    res.sendFile(path.join(__dirname, "../views/room.html"));
  else
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

roomRouter.get("/list", roomController.roomList);

roomRouter.get("/chat/:room_seq", (req, res) => {
  if (req.session.isLogined)
    res.sendFile(path.join(__dirname, "../views/chat.html"));
  else
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

roomRouter.get("/chat/:from_user/:to_user", (req, res) => {
  if (req.session.isLogined)
    res.sendFile(path.join(__dirname, "../views/dm.html"));
  else
    res.sendFile(path.join(__dirname, "../views/login.html"));
})


export { roomRouter };