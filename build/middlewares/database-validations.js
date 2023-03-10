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
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectExist = exports.emailExist = void 0;
const models_1 = require("../models");
const emailExist = (email = "") => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ where: { user_email: email } });
    if (user) {
        throw new Error(`User With Email ${email} Already Exists`);
    }
    return true;
});
exports.emailExist = emailExist;
const projectExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield models_1.Project.findOne({ where: { project_id: id } });
    if (!project) {
        throw new Error(`Project With ID: ${id} Not Exists`);
    }
    return true;
});
exports.projectExist = projectExist;
