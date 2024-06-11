import mongoose from "mongoose";

const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid", { value, label: helpers.state.path });
  }
  return value;
};

export default isValidObjectId;
