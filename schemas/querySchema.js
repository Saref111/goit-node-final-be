import Joi from "joi";
import mongoose from "mongoose";

const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error(`${value} is not valid`);
  }
  return value;
};

export const querySchema = Joi.object({
  limit: Joi.number().min(1),
  page: Joi.number().min(1),
  category: Joi.string().custom(isValidObjectId, "ObjectId validation"),
  area: Joi.string().custom(isValidObjectId, "ObjectId validation"),
  ingredient: Joi.string().custom(isValidObjectId, "ObjectId validation"),
});

export const paginationSchema = Joi.object({
  limit: Joi.number().min(1),
  page: Joi.number().min(1),
});
