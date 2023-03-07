"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.UserRouter = void 0;
const users_routes_1 = __importDefault(require("./users.routes"));
exports.UserRouter = users_routes_1.default;
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.AuthRouter = auth_routes_1.default;
