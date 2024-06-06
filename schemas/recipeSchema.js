import Joi from "joi";

export const recipeCreateSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  category: Joi.string().required(),
  area: Joi.string().required(),
  ingredients: Joi.array().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
});
