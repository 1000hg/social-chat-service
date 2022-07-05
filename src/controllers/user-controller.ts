import { Response, Request } from "express";

import { loginService, signUpService } from "../services/user-service";
import { serviceStatusForm } from "../utils/serviceModules";

const signUp = async (req: Request, res: Response) => {
  console.log(req.body);
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
      res.status(200).send({status: 400, message: "Id, Password required"});
      return;
  }
  const { user_id, user_password } = req.body;
  const returnData: serviceStatusForm = await loginService(user_id, user_password);

  const { status, message, responseData } = returnData;
  res.status(200).send({
      status,
      message,
      responseData,
  });
};

export default {
  signUp: signUp,
  login: login
};