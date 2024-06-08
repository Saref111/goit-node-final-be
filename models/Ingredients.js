import { Schema, model } from "mongoose";

const ingredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    img: {
      type: String,
      required: [true, "Thumb is required"],
    },
  },
  { versionKey: false }
);

const Ingredients = model("ingredients", ingredientsSchema);

export default Ingredients;
