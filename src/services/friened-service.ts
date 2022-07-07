import Friend from "../models/friend.model";
import { serviceStatusForm } from "../modules/serviceModules";
import { Op } from 'sequelize';

const InsertFriendService = async (
    from_user: number,
    to_user: number
  ) => {
  
    const returnForm: serviceStatusForm = {
      status: 500,
      message: "server error",
      responseData: {},
    };
  
    let isFriendExist = false;
    await Friend.findOne({ where: { from_user: from_user, to_user: to_user } })
      .then((data) => {
        if (data) {
          isFriendExist = true;
          returnForm.status = 400;
          returnForm.message = "already Sending";
          returnForm.responseData = new Array(data);
        }
      })
      .catch((e) => {
        console.log(e);
        returnForm.status = 500;
        returnForm.message = "Server Error";
        return;
      });
  
    if (!isFriendExist) {
      await new Friend({
        from_user: from_user || "",
        to_user: to_user || "",
        is_friend: false
      })
        .save()
        .then((data) => {
          returnForm.status = 200;
          returnForm.message = "Insert Friend Success";
        })
        .catch((e) => {
          console.log(e);
          returnForm.status = 500;
          returnForm.message = "Server Error";
        });
  
    }
    return returnForm;
  };

  const getRequestFriendListService = async (from_user: number) => {
    const returnForm: serviceStatusForm = {
      status: 500,
      message: "Server error",
      responseData: {},
    };
  
    await Friend.findAll({
      where: { from_user: from_user }
    })
      .then(
        async (data) => {
          returnForm.status = 200;
          returnForm.message = "Success get request friend List";
          returnForm.responseData = data;
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

  const getResponseFriendListService = async (to_user: number) => {
    const returnForm: serviceStatusForm = {
      status: 500,
      message: "Server error",
      responseData: {},
    };
  
    let friend = await Friend.findAll({
      where: { to_user: to_user, is_friend: 0},
    })

    if (friend) {
      returnForm.status = 200;
      returnForm.message = "Success get response friend list";
      returnForm.responseData = friend;
    }
  
    return returnForm;
  };

  const getFriendListService = async (user: number) => {
    const returnForm: serviceStatusForm = {
      status: 500,
      message: "Server error",
      responseData: {},
    };
  
    let friend = await Friend.findAll({
      where: { [Op.or]: [{ from_user: user, is_friend: 1 }, { to_user: user, is_friend: 1 }],  },
    })

    if (friend) {
      returnForm.status = 200;
      returnForm.message = "Success get friend list";
      returnForm.responseData = friend;
    }
  
    return returnForm;
  };

  const updateFriendService = async (from_user: number, to_user: number, status: number) => {
    const returnForm: serviceStatusForm = {
      status: 500,
      message: "Server error",
      responseData: {},
    };
  
    await Friend.update({
      is_friend: status
    },{
      where : { from_user: from_user, to_user: to_user}
    }).then(()=>{
      returnForm.status = 200;
      returnForm.message = "Success update friend";
     });
  
    return returnForm;
  };

  const deleteFriendService = async(from_user: number, to_user: number) => {
    const returnForm: serviceStatusForm = {
      status: 500,
      message: "Server error",
      responseData: {},
    };

    await Friend.destroy({
        where : { from_user: from_user, to_user: to_user, is_friend: 1 }
      }).then(()=>{
        returnForm.status = 200;
        returnForm.message = "Success delete friend";
      });
    
      return returnForm;
  };


  export { 
    InsertFriendService, 
    getRequestFriendListService, 
    getResponseFriendListService, 
    updateFriendService,
    getFriendListService,
    deleteFriendService
  };