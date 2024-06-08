<<<<<<< HEAD
import Ingredients from "../models/Ingredients.js";

export const getIngredients = () =>  Ingredients.find().sort({name: 1});
=======
import Ingredient from "../models/Ingredient.js";
>>>>>>> c308331 (fixed models (area, ingredien, category, recipe), fixed imports in areas, ingrediens, categories, recipes services fixed res.json return)

export const getIngredients = () => Ingredient.find();
