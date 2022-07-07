import { Response, Request } from "express";

import {
  loginService,
  signUpService,
  getUserService,
  getUserListService,
  getSomeUserService
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

  const returnData: serviceStatusForm = await loginService(user_id, user_password);

  const { status, message, responseData } = returnData;

  if (status == 200) {
    req.session.isLogined = true;
    req.session.user_id = responseData.user_id;
    req.session.user_seq = responseData.id;
  }

  res.status(200).send({
    status,
    message,
    responseData,
  });
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

  const returnData: serviceStatusForm = await getUserService(req.session.user_id)

  const { status, message, responseData } = returnData;

  res.status(200).send({
    status,
    message,
    responseData,
  });
}

const getSomeUser = async (req: Request, res: Response) => {
  if (!req.query.user_seq) {
    res.status(200).send({ status: 400, message: "need data" });
    return;
  }

  let user_seq:number = +req.query.user_seq

  const returnData: serviceStatusForm = await getSomeUserService(user_seq)

  const { status, message, responseData } = returnData;

   res.status(200).send({
     status,
     message,
     responseData,
   });
}

const getUserList = async (req: Request, res: Response) => {

  const returnData: serviceStatusForm = await getUserListService(req.session.user_id, req.session.user_seq)

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
  getUserList: getUserList,
  getSomeUser: getSomeUser
};