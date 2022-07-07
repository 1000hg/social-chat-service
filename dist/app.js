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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const index_1 = __importDefault(require("./socket/index"));
const models_1 = require("./models");
const routes_1 = __importDefault(require("./routes"));
const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`Request ${req.method}, ${req.url}`);
    next();
});
app.use((0, cookie_parser_1.default)());
const SESSIONKEY = process.env.SESSIONKEY || 'key';
app.use((0, express_session_1.default)({
    secret: SESSIONKEY,
    resave: true,
    saveUninitialized: true,
}));
app.use(routes_1.default);
const httpServer = http_1.default.createServer(app);
(0, index_1.default)(httpServer);
httpServer.listen(PORT, HOST, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server Listening on ${HOST}:${PORT}`);
    models_1.sequelize.sync();
    yield models_1.sequelize.authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("connection success");
    }))
        .catch((e) => {
        console.log('error : ', e);
    });
}));
