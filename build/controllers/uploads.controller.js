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
exports.uploadAvatar = void 0;
const upload_file_1 = require("../helpers/upload-file");
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = req.files) === null || _a === void 0 ? void 0 : _a.avatar)) {
        return res.status(400).json({ msg: "Not Image Found" });
    }
    const pathImg = yield (0, upload_file_1.uploadFile)((_b = req.files) === null || _b === void 0 ? void 0 : _b.avatar, ["png", "jpg"], "img");
    return res.json({ msg: "Image Upload SuccessFull", pathImg });
});
exports.uploadAvatar = uploadAvatar;
