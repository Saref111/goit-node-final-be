import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  { versionKey: false }
);

const Category = model("category", categorySchema);

export default Category;
