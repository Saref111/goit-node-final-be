import Joi from "joi";

export const searchQuerySchema = Joi.object({
  limit: Joi.number().min(1),
  page: Joi.number().min(1),
  category: Joi.string(),
  area: Joi.string(),
  ingredient: Joi.string(),
});
