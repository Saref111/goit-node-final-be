import Ingredient from "../models/Ingredient.js";
export const getIngredients = () => Ingredient.find();
