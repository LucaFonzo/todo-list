import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import { AuthRouter, UserRouter, } from './routes/v1';
import { connectDB } from "./database/db";
export default class Server {
  private app: express.Application;
  private port: number | undefined;
  private paths;
  constructor() {
    this.app = express();
    this.port = 4000;
    this.paths = {
      users: '/api/v1/users',
      auth: '/api/v1/auth'
    }
    connectDB();
    this.middlewares();
    this.routes();
  }
  routes() {
    this.app.use(this.paths.users, UserRouter);
    this.app.use(this.paths.auth, AuthRouter);
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan('dev'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Working On Port: ${this.port}`);
    })
  }
}
