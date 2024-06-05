import ctrlWrapper from "../decorators/ctrlWrappe.js";
import HttpError from "../helpers/HttpError.js";

import {
  getRecipes,
  getRecipe,
  updateFavorites,
} from "../services/recipesService.js";

const getPopular = async (req, res) => {
  const { page = 2, limit = 5 } = req.query;
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
  const recipe = await getRecipe({ _id });
  if (!recipe) {
    throw HttpError(404, `Recipe with ${_id} not found`);
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
  const recipe = await getRecipe({ _id });
  if (!recipe) {
    throw HttpError(404, `Recipe with ${_id} not found`);
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
