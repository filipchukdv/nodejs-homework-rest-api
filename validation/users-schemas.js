import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

export const userAuthSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
export const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.required().valid("starter", "pro", "business"),
});

export const avatarSchema = Joi.object({
  avatarURL: Joi.string().required(),
});
