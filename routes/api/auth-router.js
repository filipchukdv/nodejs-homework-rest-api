import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { authenticate, upload } from "../../middlewars/index.js";
import { validateBody } from "../../decoratos/index.js";
import {
  avatarSchema,
  userAuthSchema,
  userUpdateSubscriptionSchema,
} from "../../validation/users-schemas.js";
export const router = express.Router();

router.post("/signup", validateBody(userAuthSchema), authControllers.signup);
router.post("/login", validateBody(userAuthSchema), authControllers.login);
router.get("/current", authenticate, authControllers.getCurrent);
router.post("/logout", authenticate, authControllers.logout);
router.patch(
  "/subscription",
  authenticate,
  validateBody(userUpdateSubscriptionSchema),
  authControllers.updateSubscription
);
router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);
