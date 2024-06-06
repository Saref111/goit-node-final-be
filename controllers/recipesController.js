<<<<<<< HEAD
import ctrlWrapper from "../decorators/ctrlWrappe.js";
import HttpError from "../helpers/HttpError.js";

import {
  getRecipes,
  getRecipeById,
  updateFavorites,
} from "../services/recipesService.js";

const getPopular = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const popular = await getRecipes(skip, limit);
  res.json(popular);
};

const getFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const favorites = await getRecipes(skip, limit, userId);
  res.json(favorites);
};

const addToFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const recipe = await getRecipeById({ _id });
  if (!recipe) {
    throw HttpError(404, `Recipe with id: ${_id} not found`);
  }
  const { favorite } = recipe;
  if (favorite.includes(userId)) {
    throw HttpError(409, `Recipe already in favorites`);
  }
  favorite.push(userId);
  const result = await updateFavorites({ _id }, recipe);
  res.json(result);
};

const deleteFromFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const recipe = await getRecipeById({ _id });
  if (!recipe) {
    throw HttpError(404, `Recipe with id: ${_id} not found`);
  }
  const { favorite } = recipe;
  favorite.pop(userId);
  const result = await updateFavorites({ _id }, recipe);
  res.json(result);
};

export default {
  getPopular: ctrlWrapper(getPopular),
  getFavorite: ctrlWrapper(getFavorite),
  addToFavorite: ctrlWrapper(addToFavorite),
  deleteFromFavorite: ctrlWrapper(deleteFromFavorite),
};
=======
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
>>>>>>> abb3784 (added ricipes controller, added recipes service,  added recipes route, added recipes router,  added validateQuery middleware, added validateQuerySchema, fixed mongoose schema,)
