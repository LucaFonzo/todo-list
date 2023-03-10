import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import { AuthRouter, UserRouter,ProjectRouter,TaskRouter,UploadRouter } from './routes/v1';
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
      auth: '/api/v1/auth',
      projects: '/api/v1/projects',
      tasks: '/api/v1/tasks',
      uploads: '/api/v1/uploads'
    }
    connectDB();
    this.middlewares();
    this.routes();
  }
  routes() {
    this.app.use(this.paths.users, UserRouter);
    this.app.use(this.paths.auth, AuthRouter);
    this.app.use(this.paths.projects, ProjectRouter);
    this.app.use(this.paths.tasks, TaskRouter);
    this.app.use(this.paths.uploads,UploadRouter);
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        createParentPath: true
      })
    );
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Working On Port: ${this.port}`);
    })
  }
}
