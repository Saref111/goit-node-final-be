import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    thumb: {
      type: String,
      required: [true, "Thumb is required"],
    },
  },
  { versionKey: false }
);

const Category = model("category", categorySchema);

export default Category;
