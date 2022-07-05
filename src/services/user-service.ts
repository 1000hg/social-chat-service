import User from "../models/user.model";
import { serviceStatusForm } from "../utils/serviceModules";

const signUpService = async (
  user_id: string,
  user_password: string
) => {

  const returnForm: serviceStatusForm = {
    status: 500,
    message: "server error",
    responseData: {},
  };

  let isUserExist = false;
    await User.findOne({ where: { user_id: user_id } })
        .then((data) => {
            if (data) {
                isUserExist = true;
                returnForm.status = 400;
                returnForm.message = "User Id already exist";
            }
        })
        .catch((e) => {
            console.log(e);
            returnForm.status = 500;
            returnForm.message = "Server Error";
            return;
        });

    if (!isUserExist) {
        await new User({
          user_id: user_id || "",
          user_password: user_password || "",
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
      
    }
    return returnForm;
};


const loginService = async (user_id: string, user_password: string) => {
  const returnForm: serviceStatusForm = {
      status: 500,
      message: "Server error",
      responseData: {},
  };

  await User.findOne({
      where: {
          user_id: user_id,
          user_password: user_password
      },
  })
      .then(
          async (data) => {
              if (data) {
                returnForm.status = 200;
                returnForm.message = "Login Success";
              } else {
                returnForm.status = 400;
                returnForm.message = "Id or Password Wrong";
              }
          },
          (e) => {
              throw e;
          }
      )
      .catch((e) => {
          console.log(e);
          returnForm.status = 500;
          returnForm.message = "Server Error";
      });
  return returnForm;
};


const userListService = async () => {
  const returnForm: serviceStatusForm = {
      status: 500,
      message: "Server error",
      responseData: {},
  };

  await User.findAll({
    where: {attribute: { $not: 'x'}}
  })
      .then(
          async (data) => {
              console.log(data)
          },
          (e) => {
              throw e;
          }
      )
      .catch((e) => {
          console.log(e);
          returnForm.status = 500;
          returnForm.message = "Server Error";
      });
  return returnForm;
};


export { signUpService, loginService };