import mongoose from "mongoose";
import hooks from "./hooks.js";

const ingredientSchema = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, ref: "Ingredient" },
});

const recipeSchema = mongoose.Schema(
  {
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
    thumb_preview: {
      type: String,
      required: [true, "Thumb preview is required"],
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
