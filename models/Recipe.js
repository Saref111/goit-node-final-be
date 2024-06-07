import mongoose from "mongoose";
import hooks from "./hooks.js";

const ingredientSchema = mongoose.Schema({
  _id: false,
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ingredient",
    required: [true, "ingredient is required"],
  },
  measure: {
    type: String,
    required: [true, "measure of ingredient is required"],
  },
});

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    area: {
      type: mongoose.Schema.Types.ObjectId,
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
    preview: {
      type: String,
      required: [true, "Preview is required"],
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

const Recipe = mongoose.model("recipe", recipeSchema);

export default Recipe;
