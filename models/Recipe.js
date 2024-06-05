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
    ref: "User",
  },
  area: {
    type: String,
    required: [true, "Area is required"],
  },
  ingredients: {
    type: Array,
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
    type: Array,
    required: [true, "Thumb is required"],
  },
  favorite: {
    type: Array,
    default: [],
  },
});

recipeSchema.post("save", hooks.handleSaveError);
recipeSchema.pre("findOneAndUpdate", hooks.setUpdateSettings);
recipeSchema.post("findOneAndUpdate", hooks.handleSaveError);

const Recipe = mongoose.model("recipe", recipeSchema);

export default Recipe;
