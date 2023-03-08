"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controller_1 = require("../../controllers/projects.controller");
const express_validator_1 = require("express-validator");
const validate_result_1 = require("../../middlewares/validate-result");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("project_name", "Project name is required").not().isEmpty(),
    (0, express_validator_1.check)("project_description", "Project description is required")
        .not()
        .isEmpty(),
    validate_result_1.validateResult,
], projects_controller_1.create);
router.get("/", projects_controller_1.getAll);
router.get("/:id", projects_controller_1.get);
router.put("/:id", [
    (0, express_validator_1.check)("project_name", "Project name is required").not().isEmpty(),
    (0, express_validator_1.check)("project_description", "Project description is required")
        .not()
        .isEmpty(),
    validate_result_1.validateResult,
], projects_controller_1.update);
router.delete("/:id", projects_controller_1.remove);
router;
exports.default = router;
