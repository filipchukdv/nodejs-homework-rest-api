import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

export const userAuthSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});
