import { Sequelize } from 'sequelize-typescript';
import User from './user.model';
import Friend from './friend.model';
import Room from './room.model';
import { config } from '../config/config'

export const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
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
  }
);

sequelize.addModels([User, Room, Friend]);