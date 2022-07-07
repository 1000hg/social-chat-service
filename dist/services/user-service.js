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
exports.getSomeUserService = exports.getUserListService = exports.getUserService = exports.loginService = exports.signUpService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const friend_model_1 = __importDefault(require("../models/friend.model"));
const sequelize_1 = require("sequelize");
const signUpService = (user_id, user_password) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "server error",
        responseData: {},
    };
    let isUserExist = false;
    yield user_model_1.default.findOne({ where: { user_id: user_id } })
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
        yield new user_model_1.default({
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
});
exports.signUpService = signUpService;
const loginService = (user_id, user_password) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "Server error",
        responseData: {},
    };
    yield user_model_1.default.findOne({
        where: {
            user_id: user_id,
            user_password: user_password
        },
        raw: true,
    })
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data) {
            returnForm.status = 200;
            returnForm.message = "Login Success";
            returnForm.responseData = data;
        }
        else {
            returnForm.status = 400;
            returnForm.message = "Id or Password Wrong";
        }
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
exports.loginService = loginService;
const getUserService = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "Server error",
        responseData: {},
    };
    yield user_model_1.default.findOne({
        where: { user_id: user_id }
    })
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        returnForm.status = 200;
        returnForm.message = "Success get user";
        returnForm.responseData = new Array(data);
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
exports.getUserService = getUserService;
const getSomeUserService = (user_seq) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "Server error",
        responseData: {},
    };
    yield user_model_1.default.findOne({
        where: { id: user_seq }
    })
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        returnForm.status = 200;
        returnForm.message = "Success get user";
        returnForm.responseData = new Array(data);
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
exports.getSomeUserService = getSomeUserService;
const getUserListService = (user_id, user_seq) => __awaiter(void 0, void 0, void 0, function* () {
    const returnForm = {
        status: 500,
        message: "Server error",
        responseData: {},
    };
    let user = yield user_model_1.default.findAll({
        where: {
            user_id: { [sequelize_1.Op.notIn]: [user_id] }
        },
        raw: true
    });
    let friend = yield friend_model_1.default.findAll({
        where: {
            from_user: user_seq
        },
        raw: true
    });
    returnForm.status = 200;
    returnForm.message = "Success get user";
    returnForm.responseData = { "user": user, "friend": friend };
    return returnForm;
});
exports.getUserListService = getUserListService;
