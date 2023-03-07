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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize((_a = process.env.DB_NAME) !== null && _a !== void 0 ? _a : "todo_db", (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : "root", (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : "", {
    host: process.env.DB_HOST,
    port: (_d = Number(process.env.DB_PORT)) !== null && _d !== void 0 ? _d : 3306,
    dialect: "mysql",
});
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.sequelize.authenticate();
            console.log("Database connection succesfull");
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.connectDB = connectDB;
