import { Response, Request } from "express";

import {
  loginService,
  signUpService,
  getUserService,
  getUserListService
} from "../services/user-service";
import { serviceStatusForm } from "../modules/serviceModules";

const signUp = async (req: Request, res: Response) => {
  if (!req.body.user_id || !req.body.user_password) {
    res.status(200).send({ status: 400, message: "Enter Id and Password" });
    return;
  }
  const { user_id, user_password } = req.body;

  const returnData: serviceStatusForm = await signUpService(
    user_id,
    user_password
  )

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
  });
}


const login = async (req: Request, res: Response) => {
  if (!req.body.user_id || !req.body.user_password) {
    res.status(200).send({ status: 400, message: "Id, Password required" });
    return;
  }
  const { user_id, user_password } = req.body;

  if (req.session.isLogined) {
    res.redirect("/room")
  } else {
    const returnData: serviceStatusForm = await loginService(user_id, user_password);

    const { status, message, responseData } = returnData;

    if (status == 200) {
      req.session.isLogined = true;
      req.session.user_id = user_id;
    }

    res.status(200).send({
      status,
      message,
      responseData,
    });
  }
};

const logout = async (req: Request, res: Response) => {
  let returnData: serviceStatusForm;

  if (req.session.isLogined) {
    req.session.destroy((err) => {
      if (err) {
        returnData.status = 400;
        returnData.message = "에러가 발생하였습니다."

        const { status, message, responseData } = returnData;

        res.status(200).send({
          status,
          message,
          responseData
        });
      } else {
        res.redirect("/");
      }

    });

  }
}

const getUser = async (req: Request, res: Response) => {

  const returnData: serviceStatusForm = await getUserService(req.session.user_id as string)

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
  });
}

const getUserList = async (req: Request, res: Response) => {

  const returnData: serviceStatusForm = await getUserListService()

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
  });
}


export default {
  signUp: signUp,
  login: login,
  logout: logout,
  getUser: getUser,
  getUserList: getUserList
};