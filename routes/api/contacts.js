import express from "express";
import contactsController from "../../controllers/contacts-controllers.js";
export const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", contactsController.add);

router.delete("/:contactId", contactsController.removeById);

router.put("/:contactId", contactsController.updateById);
