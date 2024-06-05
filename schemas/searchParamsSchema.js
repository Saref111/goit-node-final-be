import Joi from "joi";

export const searchParamsSchema = Joi.object({
  area: Joi.string(),
});
