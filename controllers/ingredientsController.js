import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { getIngredients } from "../services/ingredientsService.js";

const getAllIngredients = async (req, res) => {
  const ingredients = await getIngredients();
  res.json(ingredients);
};

export default {
  getAllIngredients: ctrlWrapper(getAllIngredients),
};
