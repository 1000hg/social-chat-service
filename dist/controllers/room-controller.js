"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_service_1 = require("../services/room-service");
const roomList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnData = yield (0, room_service_1.roomListService)();
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.room_seq && !req.body.user_count) {
        res.status(200).send({ status: 400, message: "need data" });
        return;
    }
    const returnData = yield (0, room_service_1.updateRoomService)(req.body.room_seq, req.body.user_count);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
exports.default = {
    roomList: roomList,
    updateRoom: updateRoom
};
