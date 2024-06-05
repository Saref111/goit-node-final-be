import ctrlWrapper from "../decorators/ctrlWrappe.js";

import {
  getRecipes,
  getRecipe,
  updateFavorites,
} from "../services/recipesService.js";

const getPopular = async (req, res) => {
  const popular = await getRecipes();
  popular.sort((a, b) => b.favorite.length - a.favorite.length);
  res.json(popular);
};

const getFavorite = async (req, res) => {
  const { _id } = req.user;
  const result = await getRecipes();
  const favorites = result.filter((item) => item.favorite.includes(_id));
  res.json(favorites);
};

const addToFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const recipe = await getRecipe({ _id });
  const { favorite } = recipe;
  favorite.push(userId);
  const result = await updateFavorites({ _id }, recipe);
  res.json(result);
};

const deleteFromFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const recipe = await getRecipe({ _id });
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
