"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_controller_1 = require("../../controllers/uploads.controller");
const router = (0, express_1.Router)();
router.post('/user', uploads_controller_1.uploadAvatar);
exports.default = router;
