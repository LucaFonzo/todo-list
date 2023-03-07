import { Router } from "express";
import {
  create,
  remove,
  getAll,
  get,
  update,
} from "../../controllers/users.controller";
import { check } from "express-validator";
import { validateResult } from "../../middlewares/validate-result";
import { emailExist } from "../../middlewares/database-validations";
const router = Router();

router.get("/", getAll);
router.get("/:id", get);
router.post(
  "/",
  [
    check("user_name","Username is empty").not().isEmpty(),
    check("user_email","Not Valid Email").isEmail(),
    check("user_email").custom(emailExist),
    check("user_password","Min length of password has to be 6").isLength({ min: 6 }),
    validateResult,
  ],
  create
);
router.delete("/:id", remove);
router.put(
  "/:id",
  [
    check("user_name").not().isEmpty(),
    check("user_email").isEmail(),
    check("user_password").isLength({ min: 6 }),
    validateResult,
  ],
  update
);

export default router;
