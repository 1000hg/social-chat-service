"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = __importDefault(require("./user.model"));
const friend_model_1 = __importDefault(require("./friend.model"));
const room_model_1 = __importDefault(require("./room.model"));
const config_1 = require("../config/config");
exports.sequelize = new sequelize_typescript_1.Sequelize(config_1.config.development.database, config_1.config.development.username, config_1.config.development.password, {
    host: config_1.config.development.host,
    dialect: "mysql",
    models: [__dirname + "/**/*.model.ts"],
    define: {
        timestamps: false
    },
    timezone: "+09:00",
    pool: {
        max: 30,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.sequelize.addModels([user_model_1.default, room_model_1.default, friend_model_1.default]);
