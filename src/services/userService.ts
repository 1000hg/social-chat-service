import User from "../models/user.model";
import { serviceReturnForm } from "../utils/serviceModules";

const signUpService = async (
  user_id: string,
  user_password: string
) => {

  const returnForm: serviceReturnForm = {
    status: 500,
    message: "server error",
    responseData: {},
  };

  await new User({
    user_id: user_id || "",
    user_password: user_password || "",
    create_dtm: Date.now,
    update_dtm: Date.now,
  })
    .save()
    .then((data) => {
      returnForm.status = 200;
      returnForm.message = "SignUp Success";
    })
    .catch((e) => {
      console.log(e);
      returnForm.status = 500;
      returnForm.message = "Server Error";
    });

  return returnForm;
};

export { signUpService };