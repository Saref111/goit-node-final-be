import Joi from "joi";

export const paginationSchema = Joi.object({
  limit: Joi.number().min(1),
  page: Joi.number().min(1),
});
