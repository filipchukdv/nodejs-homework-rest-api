import express from "express";
import contactsController from "../../controllers/contacts-controllers.js";
import {
  authenticate,
  compareOwner,
  isValidId,
} from "../../middlewars/index.js";
export const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAll);
router.get("/:contactId", isValidId, compareOwner, contactsController.getById);
router.post("/", contactsController.add);
router.delete(
  "/:contactId",
  isValidId,
  compareOwner,
  contactsController.removeById
);
router.put(
  "/:contactId",
  isValidId,
  compareOwner,
  contactsController.updateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  compareOwner,
  contactsController.updateFavorite
);
