"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = require("../../controllers/tasks.controller");
const express_validator_1 = require("express-validator");
const validate_result_1 = require("../../middlewares/validate-result");
const database_validations_1 = require("../../middlewares/database-validations");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("task_name").not().isEmpty(),
    (0, express_validator_1.check)("task_description").not().isEmpty(),
    (0, express_validator_1.check)("task_priority").not().isEmpty(),
    (0, express_validator_1.check)("project_fk").not().isEmpty(),
    (0, express_validator_1.check)("project_fk").custom(database_validations_1.projectExist),
    validate_result_1.validateResult,
], tasks_controller_1.create);
router.get("/", tasks_controller_1.getAll);
router.get("/:id", tasks_controller_1.get);
router.put("/:id", [
    (0, express_validator_1.check)("task_name").not().isEmpty(),
    (0, express_validator_1.check)("task_description").not().isEmpty(),
    (0, express_validator_1.check)("task_priority").not().isEmpty(),
    (0, express_validator_1.check)("project_fk").not().isEmpty(),
    (0, express_validator_1.check)("project_fk").custom(database_validations_1.projectExist),
    validate_result_1.validateResult,
], tasks_controller_1.update);
router.delete('/:id', tasks_controller_1.remove);
exports.default = router;
