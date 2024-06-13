import { Schema, model } from "mongoose";
import hooks from "./hooks.js";

const ingredientSchema = Schema({
  _id: false,
  id: {
    type: Schema.Types.ObjectId,
    ref: "ingredient",
    required: [true, "ingredient is required"],
  },
  measure: {
    type: String,
    required: [true, "Measure of ingredient is required"],
  },
});

const recipeSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Owner is required"],
    },
    area: {
      type: Schema.Types.ObjectId,
      ref: "area",
      required: [true, "Area is required"],
    },
    ingredients: {
      type: [ingredientSchema],
      required: [true, "Ingredients are required"],
    },
    instructions: {
      type: String,
      required: [true, "Instructions are required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    thumb: {
      type: String,
      required: [true, "Thumb is required"],
    },
    time: {
      type: Number,
      min: 1,
      require: [true, "Thumb is required"],
    },
    favorite: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);

recipeSchema.post("save", hooks.handleSaveError);
recipeSchema.pre("findOneAndUpdate", hooks.setUpdateSettings);
recipeSchema.post("findOneAndUpdate", hooks.handleSaveError);

const Recipe = model("recipe", recipeSchema);

export default Recipe;
