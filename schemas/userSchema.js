import Joi from "joi";
import {
  EMAIL_REGEXP,
  MAX_NAME,
  MIN_NAME,
  MIN_PASSWORD,
} from "../constants/user.js";

export const userRegistrationSchema = Joi.object({
  name: Joi.string().min(MIN_NAME).max(MAX_NAME).required(),
  password: Joi.string().min(MIN_PASSWORD).required(),
  email: Joi.string().pattern(EMAIL_REGEXP).required().messages({
    "string.pattern.base": "Invalid email",
  }),
});

export const userLoginSchema = Joi.object({
  password: Joi.string().min(MIN_PASSWORD).required(),
  email: Joi.string().pattern(EMAIL_REGEXP).required().messages({
    "string.pattern.base": "Invalid email",
  }),
});
