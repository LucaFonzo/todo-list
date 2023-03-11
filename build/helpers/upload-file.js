"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const uploadFile = (file, validExtensions = ["jpg", "png", "gif", "jpeg"], folder) => {
    return new Promise((resolve, reject) => {
        const fileToUpload = file;
        const fileNameSplited = fileToUpload.name.split(".");
        const extension = fileNameSplited[fileNameSplited.length - 1];
        if (!validExtensions.includes(extension)) {
            return reject(`Not Valid Extension: ${extension}`);
        }
        const tmpName = (0, uuid_1.v4)() + "." + extension;
        const uploadPath = path_1.default.join(__dirname, "../uploads/", folder, tmpName);
        fileToUpload.mv(uploadPath);
        return resolve(uploadPath);
    });
};
exports.uploadFile = uploadFile;
