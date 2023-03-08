"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../../controllers/users.controller");
const express_validator_1 = require("express-validator");
const validate_result_1 = require("../../middlewares/validate-result");
const database_validations_1 = require("../../middlewares/database-validations");
const verify_jwt_1 = require("../../middlewares/verify-jwt");
const router = (0, express_1.Router)();
router.get("/", users_controller_1.getAll);
router.get("/:id", users_controller_1.get);
router.post("/", [
    (0, express_validator_1.check)("user_name", "Username is empty").not().isEmpty(),
    (0, express_validator_1.check)("user_email", "Not Valid Email").isEmail(),
    (0, express_validator_1.check)("user_email").custom(database_validations_1.emailExist),
    (0, express_validator_1.check)("user_password", "Min length of password has to be 6").isLength({ min: 6 }),
    validate_result_1.validateResult,
], users_controller_1.create);
router.delete("/:id", [verify_jwt_1.verifyJWT], users_controller_1.remove);
router.put("/:id", [
    verify_jwt_1.verifyJWT,
    (0, express_validator_1.check)("user_name").not().isEmpty(),
    (0, express_validator_1.check)("user_email").isEmail(),
    (0, express_validator_1.check)("user_password").isLength({ min: 6 }),
    validate_result_1.validateResult,
], users_controller_1.update);
exports.default = router;
