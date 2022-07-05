import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction, response } from 'express';
import cors from 'cors';
import { sequelize } from "./models";
import indexRouter from "./routes";

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const HOST: string = process.env.HOST || 'localhost';
const app = express();

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request ${req.method}, ${req.url}`);
  next();
})

app.use(indexRouter);

app.listen(PORT, HOST, async () => {
  console.log(`Server Listening on ${HOST}:${PORT}`);

  sequelize.sync()
  
  await sequelize.authenticate()
    .then(async () => {
      console.log("connection success");
    })
    .catch((e) => {
      console.log('error : ', e);
    })
})