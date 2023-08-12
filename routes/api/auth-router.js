import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { authenticate } from "../../middlewars/index.js";
export const router = express.Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get("/current", authenticate, authControllers.getCurrent);
router.post("/logout", authenticate, authControllers.logout);
router.patch("/", authenticate, authControllers.updateSubscription);
