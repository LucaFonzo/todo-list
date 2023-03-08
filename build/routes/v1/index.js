"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRouter = exports.ProjectRouter = exports.AuthRouter = exports.UserRouter = void 0;
const users_routes_1 = __importDefault(require("./users.routes"));
exports.UserRouter = users_routes_1.default;
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.AuthRouter = auth_routes_1.default;
const projects_routes_1 = __importDefault(require("./projects.routes"));
exports.ProjectRouter = projects_routes_1.default;
const tasks_routes_1 = __importDefault(require("./tasks.routes"));
exports.TaskRouter = tasks_routes_1.default;
