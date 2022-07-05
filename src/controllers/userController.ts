import { Response, Request } from "express";

import { signUpService } from "../services/userService";
import { serviceReturnForm } from "../utils/serviceModules";

const signUp = async (req: Request, res: Response) => {
  if (!req.body.user_id || !req.body.user_password) {
    res.status(400).send({ status: 400, message: "Fail SignUp" });
    return;
  }
  const { user_id, user_password } = req.body;

  const returnData: serviceReturnForm = await signUpService(
    user_id,
    user_password
  );

  if (returnData.status == 200) {
    const { status, message, responseData } = returnData;
    res.status(status).send({
      status,
      message,
      responseData,
    });
  } else {
    const { status, message } = returnData;
    res.status(status).send({
      status,
      message,
    });
  }
}

export default {
  signUp: signUp
};