import Joi from "joi";
import { emailRegexp } from "../constants/contact-constants.js";

export const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
