import User from "../models/user.model";
import Friend from "../models/friend.model";
import { serviceStatusForm } from "../modules/serviceModules";
import { Op } from 'sequelize';

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
      friend_count: 0
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
    raw: true,
  })
    .then(
      async (data) => {
        if (data) {
          returnForm.status = 200;
          returnForm.message = "Login Success";
          returnForm.responseData = data;
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


const getUserService = async (user_id: string) => {
  const returnForm: serviceStatusForm = {
    status: 500,
    message: "Server error",
    responseData: {},
  };

  await User.findOne({
    where: { user_id: user_id }
  })
    .then(
      async (data) => {
        returnForm.status = 200;
        returnForm.message = "Success get user";
        returnForm.responseData = new Array(data);
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

const getSomeUserService = async (user_seq: number) => {
  const returnForm: serviceStatusForm = {
    status: 500,
    message: "Server error",
    responseData: {},
  };

  await User.findOne({
    where: { id: user_seq }
  })
    .then(
      async (data) => {
        returnForm.status = 200;
        returnForm.message = "Success get user";
        returnForm.responseData = new Array(data);
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

const getUserListService = async (user_id: string, user_seq: number) => {
  const returnForm: serviceStatusForm = {
    status: 500,
    message: "Server error",
    responseData: {},
  };

  let user = await User.findAll({
    where: { 
      user_id: {[Op.notIn]: [user_id]}
    },
    raw: true
  })

  let friend = await Friend.findAll({
    where: {
      from_user: user_seq
    },
    raw: true
  })

  returnForm.status = 200;
  returnForm.message = "Success get user";
  returnForm.responseData = { "user": user, "friend": friend };

  return returnForm;
};


export { signUpService, loginService, getUserService, getUserListService, getSomeUserService };