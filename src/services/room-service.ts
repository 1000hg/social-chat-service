import Room from "../models/room.model";
import { serviceStatusForm } from "../modules/serviceModules";

const roomListService = async () => {
  const returnForm: serviceStatusForm = {
    status: 500,
    message: "Server error",
    responseData: {},
  };

  await Room.findAll({})
    .then(
      async (data) => {
        returnForm.status = 200;
        returnForm.message = "success get room list";
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

const updateRoomService = async (room_seq: number, join_count: number) => {
  const returnForm: serviceStatusForm = {
    status: 500,
    message: "Server error",
    responseData: {},
  };

  await Room.update({
    join_count: join_count
  },{
    where : { id: room_seq}
  }).then(()=>{
    returnForm.status = 200;
    returnForm.message = "Success update Room";
   });

  return returnForm;
};


export { roomListService, updateRoomService };