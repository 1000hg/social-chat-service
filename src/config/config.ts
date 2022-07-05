import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'chat',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: "mysql"
  }
}