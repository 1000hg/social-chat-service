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
const user_service_1 = require("../services/user-service");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.user_id || !req.body.user_password) {
        res.status(200).send({ status: 400, message: "Enter Id and Password" });
        return;
    }
    const { user_id, user_password } = req.body;
    const returnData = yield (0, user_service_1.signUpService)(user_id, user_password);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.user_id || !req.body.user_password) {
        res.status(200).send({ status: 400, message: "Id, Password required" });
        return;
    }
    const { user_id, user_password } = req.body;
    const returnData = yield (0, user_service_1.loginService)(user_id, user_password);
    const { status, message, responseData } = returnData;
    if (status == 200) {
        req.session.isLogined = true;
        req.session.user_id = responseData.user_id;
        req.session.user_seq = responseData.id;
    }
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let returnData;
    if (req.session.isLogined) {
        req.session.destroy((err) => {
            if (err) {
                returnData.status = 400;
                returnData.message = "에러가 발생하였습니다.";
                const { status, message, responseData } = returnData;
                res.status(200).send({
                    status,
                    message,
                    responseData
                });
            }
            else {
                res.redirect("/");
            }
        });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnData = yield (0, user_service_1.getUserService)(req.session.user_id);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
const getSomeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.user_seq) {
        res.status(200).send({ status: 400, message: "need data" });
        return;
    }
    let user_seq = +req.query.user_seq;
    const returnData = yield (0, user_service_1.getSomeUserService)(user_seq);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
const getUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnData = yield (0, user_service_1.getUserListService)(req.session.user_id, req.session.user_seq);
    const { status, message, responseData } = returnData;
    res.status(200).send({
        status,
        message,
        responseData,
    });
});
exports.default = {
    signUp: signUp,
    login: login,
    logout: logout,
    getUser: getUser,
    getUserList: getUserList,
    getSomeUser: getSomeUser
};
