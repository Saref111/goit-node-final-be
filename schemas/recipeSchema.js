import Joi from "joi";
import isValidObjectId from "../helpers/isValidObjectId.js";

export const recipeCreateSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  category: Joi.string()
    .required()
    .custom(isValidObjectId, "ObjectId validation"),
  area: Joi.string().required().custom(isValidObjectId, "ObjectId validation"),
  ingredients: Joi.array().items(
    Joi.object({
      id: Joi.string()
        .required()
        .custom(isValidObjectId, "ObjectId validation"),
      measure: Joi.string().required(),
    })
  ),
  time: Joi.number().required().min(1),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
}).messages({
  "any.invalid": '"{#label}" with value "{#value}" is not a valid ObjectId',
});
