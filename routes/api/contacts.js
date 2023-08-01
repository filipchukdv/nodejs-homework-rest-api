import express from "express";
import contactsController from "../../controllers/contacts-controllers.js";
import { isValidId } from "../../middlewars/index.js";
export const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", contactsController.add);

router.delete("/:contactId", contactsController.removeById);

router.put("/:contactId", contactsController.updateById);

router.patch("/:contactId/favorite", contactsController.updateFavorite);
