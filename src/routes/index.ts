import { Router } from "express";
import { userRouter } from "./user";
import { roomRouter } from "./room";
import { friendRouter } from "./friend";

const router = Router();

router.use("/", userRouter);

router.use("/room", roomRouter);

router.use("/friend", friendRouter);

export default router;