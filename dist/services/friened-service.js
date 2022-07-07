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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriendService = exports.getFriendListService = exports.updateFriendService = exports.getResponseFriendListService = exports.getRequestFriendListService = exports.InsertFriendService = void 0;
const friend_model_1 = __importDefault(require("../models/friend.model"));
const sequelize_1 = require("sequelize");
const InsertFriendService = (from_user, to_user) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "server error",
        responseData: {},
    };
    let isFriendExist = false;
    yield friend_model_1.default.findOne({ where: { from_user: from_user, to_user: to_user } })
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
        yield new friend_model_1.default({
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
});
exports.InsertFriendService = InsertFriendService;
const getRequestFriendListService = (from_user) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "Server error",
        responseData: {},
    };
    yield friend_model_1.default.findAll({
        where: { from_user: from_user }
    })
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        returnForm.status = 200;
        returnForm.message = "Success get request friend List";
        returnForm.responseData = data;
    }), (e) => {
        throw e;
    })
        .catch((e) => {
        console.log(e);
        returnForm.status = 500;
        returnForm.message = "Server Error";
    });
    return returnForm;
});
exports.getRequestFriendListService = getRequestFriendListService;
const getResponseFriendListService = (to_user) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "Server error",
        responseData: {},
    };
    let friend = yield friend_model_1.default.findAll({
        where: { to_user: to_user, is_friend: 0 },
    });
    if (friend) {
        returnForm.status = 200;
        returnForm.message = "Success get response friend list";
        returnForm.responseData = friend;
    }
    return returnForm;
});
exports.getResponseFriendListService = getResponseFriendListService;
const getFriendListService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "Server error",
        responseData: {},
    };
    let friend = yield friend_model_1.default.findAll({
        where: { [sequelize_1.Op.or]: [{ from_user: user, is_friend: 1 }, { to_user: user, is_friend: 1 }], },
    });
    if (friend) {
        returnForm.status = 200;
        returnForm.message = "Success get friend list";
        returnForm.responseData = friend;
    }
    return returnForm;
});
exports.getFriendListService = getFriendListService;
const updateFriendService = (from_user, to_user, status) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "Server error",
        responseData: {},
    };
    yield friend_model_1.default.update({
        is_friend: status
    }, {
        where: { from_user: from_user, to_user: to_user }
    }).then(() => {
        returnForm.status = 200;
        returnForm.message = "Success update friend";
    });
    return returnForm;
});
exports.updateFriendService = updateFriendService;
const deleteFriendService = (from_user, to_user) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "Server error",
        responseData: {},
    };
    yield friend_model_1.default.destroy({
        where: { from_user: from_user, to_user: to_user, is_friend: 1 }
    }).then(() => {
        returnForm.status = 200;
        returnForm.message = "Success delete friend";
    });
    return returnForm;
});
exports.deleteFriendService = deleteFriendService;
