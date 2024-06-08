import { Schema, model } from "mongoose";

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  { versionKey: false }
);

const Categories = model("categories", categoriesSchema);

export default Categories;
