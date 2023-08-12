import express from "express";
import contactsController from "../../controllers/contacts-controllers.js";
import {
  authenticate,
  compareOwner,
  isValidId,
  upload,
} from "../../middlewars/index.js";
import { validateBody } from "../../decoratos/index.js";
import {
  contactUpdateFavoriteSchema,
  contactsAddSchema,
} from "../../validation/contacts-schemas.js";
export const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAll);
router.get("/:contactId", isValidId, compareOwner, contactsController.getById);
router.post("/", validateBody(contactsAddSchema), contactsController.add);
router.delete(
  "/:contactId",
  isValidId,
  compareOwner,
  contactsController.removeById
);
router.put(
  "/:contactId",
  isValidId,
  validateBody(contactsAddSchema),
  compareOwner,
  contactsController.updateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactUpdateFavoriteSchema),
  compareOwner,
  contactsController.updateFavorite
);
