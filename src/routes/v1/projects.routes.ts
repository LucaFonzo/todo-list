import { Router } from "express";
import {
  create,
  getAll,
  get,
  update,
  remove,
} from "../../controllers/projects.controller";
import { check } from "express-validator";
import { validateResult } from "../../middlewares/validate-result";

const router = Router();

router.post(
  "/",
  [
    check("project_name", "Project name is required").not().isEmpty(),
    check("project_description", "Project description is required")
      .not()
      .isEmpty(),
    validateResult,
  ],
  create
);

router.get("/", getAll);

router.get("/:id", get);

router.put(
  "/:id",
  [
    check("project_name", "Project name is required").not().isEmpty(),
    check("project_description", "Project description is required")
      .not()
      .isEmpty(),
    validateResult,
  ],
  update
);

router.delete("/:id", remove);

router;

export default router;
