import { Response, Request } from "express";

import { roomListService } from "../services/room-service";
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


export default {
  roomList: roomList,
};