import fs from "fs/promises";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { uploadRecipe } from "../helpers/cloudinary.js";

import {
  getRecipes,
  getRecipeById,
  updateFavorites,
  listRecipes,
  countRecipes,
  addRecipe,
} from "../services/recipesService.js";

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  // const owner = "64c8d958249fae54bae90bb9";
  let filter = { owner };
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const results = await listRecipes({ filter, settings });

  const total = await countRecipes(owner);

  res.json({
    page,
    limit,
    total,
    results,
  });
};

const createRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  const { path, mimetype } = req.file;

  if (mimetype.split("/")[0] !== "image") {
    await fs.unlink(path);
    throw HttpError(400, "Unsupported file type");
  }
  const [thumb, thumb_preview] = await uploadRecipe(path);
  await fs.unlink(path);

  const newRecipe = await addRecipe({
    ...req.body,
    owner,
    thumb,
    thumb_preview,
  });

  res.json(newRecipe);
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
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  createRecipe: ctrlWrapper(createRecipe),
  getPopular: ctrlWrapper(getPopular),
  getFavorite: ctrlWrapper(getFavorite),
  addToFavorite: ctrlWrapper(addToFavorite),
  deleteFromFavorite: ctrlWrapper(deleteFromFavorite),
};
