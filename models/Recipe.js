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
<<<<<<< HEAD
    ref: "User",
=======
    ref: "user",
>>>>>>> abb3784 (added ricipes controller, added recipes service,  added recipes route, added recipes router,  added validateQuery middleware, added validateQuerySchema, fixed mongoose schema,)
  },
  area: {
    type: String,
    required: [true, "Area is required"],
  },
<<<<<<< HEAD
  ingredients: {
    type: Array,
    required: [true, "Ingredients are required"],
  },
=======
  ingredients: [
    {
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "ingredient" },
      measure: String,
    },
  ],
>>>>>>> abb3784 (added ricipes controller, added recipes service,  added recipes route, added recipes router,  added validateQuery middleware, added validateQuerySchema, fixed mongoose schema,)
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  thumb: {
<<<<<<< HEAD
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
=======
    type: String,
    required: [true, "Thumb is required"],
  },
});

recipeSchema.post("save", hooks.handleSaveError);
>>>>>>> abb3784 (added ricipes controller, added recipes service,  added recipes route, added recipes router,  added validateQuery middleware, added validateQuerySchema, fixed mongoose schema,)

const Recipe = mongoose.model("recipe", recipeSchema);

export default Recipe;
