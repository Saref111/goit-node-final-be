import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { listRecipes } from "../services/recipesService.js";

const getRecipes = async (req, res) => {
  const { page = 1, limit = 5, category, area, ingredient } = req.query;
  const skip = (page - 1) * limit;
  console.log(typeof category);
  const settings = { skip, limit };
  const filter = {
    ...(category && { category }),
    ...(area && { area }),
    ...(ingredient && { ["ingredients.id"]: { $in: [ingredient] } }),
  };
  const fields = "";

  const result = await listRecipes({ filter, fields, settings });
  res.status(200).json(result);
};

export default { getRecipes: ctrlWrapper(getRecipes) };
