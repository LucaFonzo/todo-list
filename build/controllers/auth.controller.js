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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const generate_jwt_1 = require("../helpers/generate-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_email, user_password } = req.body;
    try {
        const user = yield models_1.User.findOne({ where: { user_email } });
        if (!user) {
            return res.status(400).json({ msg: `User With Email ${user_email} No Exists` });
        }
        const isValidPassword = yield bcrypt_1.default.compare(user_password, user.dataValues.user_password);
        if (!isValidPassword) {
            return res.status(400).json({ msg: 'Incorrect Password' });
        }
        const { user_id, user_name } = user.dataValues;
        const token = yield (0, generate_jwt_1.generateJWT)(user_id, user_name);
        res.json({ token });
    }
    catch (error) {
        return res.status(400).json({ msg: "Not Valid User" });
    }
});
exports.login = login;
