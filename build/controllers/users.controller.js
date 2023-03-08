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
exports.update = exports.get = exports.getAll = exports.remove = exports.create = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, user_email, user_password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(user_password, 10);
        const user = yield models_1.User.create({
            user_name,
            user_email,
            user_password: hashedPassword,
        });
        yield user.save();
        return res.status(201).json({ user });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.create = create;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_1.User.destroy({ where: { user_id: id } });
        if (!user) {
            return res.status(400).json({ msg: `User With ID: ${id} Doesnt Exists` });
        }
        return res.json({ msg: `User With ID: ${id} Deleted With Success` });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.remove = remove;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.findAll();
        return res.json({ users });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.getAll = getAll;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield models_1.User.findOne({ where: { user_id: id } });
        return res.json({ user });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.get = get;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user_name, user_email, user_password } = req.body;
    try {
        yield models_1.User.update({ user_name, user_email, user_password }, { where: { user_id: id } });
        return res.json({ msg: `User Updated SuccesFull` });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.update = update;
