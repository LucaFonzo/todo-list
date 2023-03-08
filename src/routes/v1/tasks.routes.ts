import { Router } from "express";
import {
  create,
  getAll,
  get,
  update,
  remove
} from "../../controllers/tasks.controller";
import { check } from "express-validator";
import { validateResult } from "../../middlewares/validate-result";
import { projectExist } from "../../middlewares/database-validations";

const router = Router();

router.post(
  "/",
  [
    check("task_name").not().isEmpty(),
    check("task_description").not().isEmpty(),
    check("task_priority").not().isEmpty(),
    check("project_fk").not().isEmpty(),
    check("project_fk").custom(projectExist),
    validateResult,
  ],
  create
);

router.get("/", getAll);

router.get("/:id", get);

router.put(
  "/:id",
  [
    check("task_name").not().isEmpty(),
    check("task_description").not().isEmpty(),
    check("task_priority").not().isEmpty(),
    check("project_fk").not().isEmpty(),
    check("project_fk").custom(projectExist),
    validateResult,
  ],
  update
);

router.delete('/:id', remove);

export default router;
