import { Response, Request } from "express";

import {
  InsertFriendService,
  getRequestFriendListService,
  getResponseFriendListService,
  updateFriendService,
  getFriendListService,
  deleteFriendService
} from "../services/friened-service";
import { serviceStatusForm } from "../modules/serviceModules";

const insertFriend = async (req: Request, res: Response) => {
  if (!req.body.from_user || !req.body.to_user) {
    res.status(200).send({ status: 400, message: "data not exist" });
    return;
  }
  const { from_user, to_user } = req.body;

  const returnData: serviceStatusForm = await InsertFriendService(
      from_user,
      to_user
  )

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
  });
}

const getRequestFriendList = async (req: Request, res: Response) => {

  if (!req.query.from_user) {
    res.status(200).send({ status: 400, message: "user not exist" });
    return;
  }

  let from_user = +req.query.from_user;
  const returnData: serviceStatusForm = await getRequestFriendListService(from_user)

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
  });
}

const getResponseFriendList = async (req: Request, res: Response) => {
  const returnData: serviceStatusForm = await getResponseFriendListService(req.session.user_seq)

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
  });
}

const getFriendList = async (req: Request, res: Response) => {
  const returnData: serviceStatusForm = await getFriendListService(req.session.user_seq)

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
    "user_seq": req.session.user_seq
  });
}

const updateResponseFriendList = async (req: Request, res: Response) => {
  if (!req.body.from_user || !req.body.to_user || !req.body.status) {
    res.status(200).send({ status: 400, message: "data not exist" });
    return;
  }
  
  const returnData: serviceStatusForm = await updateFriendService(req.body.from_user, req.body.to_user, req.body.status)

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData
  });
}

const deleteFriend = async (req: Request, res: Response) => {
  if (!req.body.from_user || !req.body.to_user) {
    res.status(200).send({ status: 400, message: "data not exist" });
    return;
  }
  
  const returnData: serviceStatusForm = await deleteFriendService(req.body.from_user, req.body.to_user)

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData
  });
}


export default {
  insertFriend: insertFriend,
  getRequestFriendList: getRequestFriendList,
  getResponseFriendList: getResponseFriendList,
  updateResponseFriendList: updateResponseFriendList,
  getFriendList: getFriendList,
  deleteFriend: deleteFriend

};