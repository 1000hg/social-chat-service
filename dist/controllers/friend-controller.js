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
const friened_service_1 = require("../services/friened-service");
const insertFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.from_user || !req.body.to_user) {
        res.status(200).send({ status: 400, message: "data not exist" });
        return;
    }
    const { from_user, to_user } = req.body;
    const returnData = yield (0, friened_service_1.InsertFriendService)(from_user, to_user);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
const getRequestFriendList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.from_user) {
        res.status(200).send({ status: 400, message: "user not exist" });
        return;
    }
    let from_user = +req.query.from_user;
    const returnData = yield (0, friened_service_1.getRequestFriendListService)(from_user);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
const getResponseFriendList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnData = yield (0, friened_service_1.getResponseFriendListService)(req.session.user_seq);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
const getFriendList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnData = yield (0, friened_service_1.getFriendListService)(req.session.user_seq);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
        "user_seq": req.session.user_seq
    });
});
const updateResponseFriendList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.from_user || !req.body.to_user || !req.body.status) {
        res.status(200).send({ status: 400, message: "data not exist" });
        return;
    }
    const returnData = yield (0, friened_service_1.updateFriendService)(req.body.from_user, req.body.to_user, req.body.status);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData
    });
});
const deleteFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.from_user || !req.body.to_user) {
        res.status(200).send({ status: 400, message: "data not exist" });
        return;
    }
    const returnData = yield (0, friened_service_1.deleteFriendService)(req.body.from_user, req.body.to_user);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData
    });
});
exports.default = {
    insertFriend: insertFriend,
    getRequestFriendList: getRequestFriendList,
    getResponseFriendList: getResponseFriendList,
    updateResponseFriendList: updateResponseFriendList,
    getFriendList: getFriendList,
    deleteFriend: deleteFriend
};
