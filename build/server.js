"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const v1_1 = require("./routes/v1");
const db_1 = require("./database/db");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 4000;
        this.paths = {
            users: '/api/v1/users',
            auth: '/api/v1/auth'
        };
        (0, db_1.connectDB)();
        this.middlewares();
        this.routes();
    }
    routes() {
        this.app.use(this.paths.users, v1_1.UserRouter);
        this.app.use(this.paths.auth, v1_1.AuthRouter);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server Working On Port: ${this.port}`);
        });
    }
}
exports.default = Server;
