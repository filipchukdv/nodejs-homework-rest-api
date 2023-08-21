import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { authenticate, upload } from "../../middlewars/index.js";
import { validateBody } from "../../decoratos/index.js";
import {
  avatarSchema,
  emailSchema,
  userAuthSchema,
  userUpdateSubscriptionSchema,
} from "../../validation/users-schemas.js";
export const router = express.Router();

router.post("/signup", validateBody(userAuthSchema), authControllers.signup);
router.post("/login", validateBody(userAuthSchema), authControllers.login);
router.get("/verify/:verificationCode", authControllers.verify);
router.post(
  "/verify",
  validateBody(emailSchema),
  authControllers.resendVerifyCode
);
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
  validateBody(avatarSchema),
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);
