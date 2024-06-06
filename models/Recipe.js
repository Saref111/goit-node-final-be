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
<<<<<<< HEAD
    ref: "User",
=======
    ref: "user",
>>>>>>> abb3784 (added ricipes controller, added recipes service,  added recipes route, added recipes router,  added validateQuery middleware, added validateQuerySchema, fixed mongoose schema,)
=======
    ref: "user",
>>>>>>> abb3784f3d999bd604a4a68d5578b469cb6f91af
  },
  area: {
    type: String,
    required: [true, "Area is required"],
  },
<<<<<<< HEAD
<<<<<<< HEAD
  ingredients: {
    type: Array,
    required: [true, "Ingredients are required"],
  },
=======
=======
>>>>>>> abb3784f3d999bd604a4a68d5578b469cb6f91af
  ingredients: [
    {
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "ingredient" },
      measure: String,
    },
  ],
<<<<<<< HEAD
>>>>>>> abb3784 (added ricipes controller, added recipes service,  added recipes route, added recipes router,  added validateQuery middleware, added validateQuerySchema, fixed mongoose schema,)
=======
>>>>>>> abb3784f3d999bd604a4a68d5578b469cb6f91af
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
=======
    type: String,
    required: [true, "Thumb is required"],
  },
});

recipeSchema.post("save", hooks.handleSaveError);
>>>>>>> abb3784f3d999bd604a4a68d5578b469cb6f91af

const Recipe = mongoose.model("recipe", recipeSchema);

export default Recipe;
