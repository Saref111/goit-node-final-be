import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

import {
  getRecipes,
  getRecipe,
  getRecipeById,
  updateFavorites,
  listRecipes,
  searchRecipes,
} from "../services/recipesService.js";
const getQueryRecipes = async (req, res) => {
  const { page = 1, limit = 5, category, area, ingredient } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const filter = {
    ...(category && { category }),
    ...(area && { area }),
    ...(ingredient && { ["ingredients.id"]: { $in: [ingredient] } }),
  };
  const result = await searchRecipes({ filter, settings }, true);
  res.json(result);
};
const getOneRecipe = async (req, res) => {
  const { id: _id } = req.params;
  const result = await getRecipe({ _id });
  res.json({ result });
};

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  let filter = { owner };
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const result = await listRecipes({ filter, settings });

  res.json({
    result,
  });
};

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
  const result = await updateFavorites(_id, {
    $addToSet: { favorite: userId },
  });
  res.json(result);
};

const deleteFromFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const recipe = await getRecipeById({ _id });
  if (!recipe) {
    throw HttpError(404, `Recipe with id: ${_id} not found`);
  }
  const result = await updateFavorites(_id, { $pull: { favorite: userId } });
  res.json(result);
};

export default {
  getQueryRecipes: ctrlWrapper(getQueryRecipes),
  getOneRecipe: ctrlWrapper(getOneRecipe),
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  getPopular: ctrlWrapper(getPopular),
  getFavorite: ctrlWrapper(getFavorite),
  addToFavorite: ctrlWrapper(addToFavorite),
  deleteFromFavorite: ctrlWrapper(deleteFromFavorite),
};
