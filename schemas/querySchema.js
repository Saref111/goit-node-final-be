import Joi from "joi";
import isValidObjectId from "../helpers/isValidObjectId.js";

export const querySchema = Joi.object({
  limit: Joi.number().min(1),
  page: Joi.number().min(1),
  category: Joi.string().custom(isValidObjectId, "ObjectId validation"),
  area: Joi.string().custom(isValidObjectId, "ObjectId validation"),
  ingredient: Joi.string().custom(isValidObjectId, "ObjectId validation"),
}).messages({
  "any.invalid": '"{#label}" with value "{#value}" is not a valid ObjectId',
});

export const paginationSchema = Joi.object({
  limit: Joi.number().min(1),
  page: Joi.number().min(1),
});
