import { Response, Request } from "express";

import { roomListService,
  updateRoomService
} from "../services/room-service";
import { serviceStatusForm } from "../modules/serviceModules";

const roomList = async (req: Request, res: Response) => {

  const returnData: serviceStatusForm = await roomListService()

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
  });
}

const updateRoom = async (req: Request, res: Response) => {
  if (!req.body.room_seq && !req.body.user_count) {
    res.status(200).send({ status: 400, message: "need data" });
    return;
  }
  const returnData: serviceStatusForm = await updateRoomService(req.body.room_seq, req.body.user_count)

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
  });
}


export default {
  roomList: roomList,
  updateRoom: updateRoom
};