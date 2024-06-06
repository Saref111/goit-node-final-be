import mongoose from "mongoose";
import hooks from "./hooks.js";

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  area: {
    type: String,
    required: [true, "Area is required"],
  },
  ingredients: [
    {
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "ingredient" },
      measure: String,
    },
  ],
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
});

recipeSchema.post("save", hooks.handleSaveError);

const Recipe = mongoose.model("recipe", recipeSchema);

export default Recipe;
