import { isValidObjectId } from "mongoose";
import HttpError from "./HttpError.js";

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

export default validateId;
