import fs from "fs/promises";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { uploadRecipe } from "../helpers/cloudinary.js";

import {
  getRecipes,
  getRecipe,
  getRecipeById,
  updateFavorites,
  listRecipes,
  countRecipes,
  addRecipe,
  searchRecipes,
  removeRecipe,
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
  const result = await searchRecipes({ filter, settings });
  // const result = await Promise.all([
  //   searchRecipes({ filter, settings }),
  //   countRecipes(),
  // ])
  //   .then(([recipes, totalDocuments]) => {
  //     console.log(recipes);
  //     const totalPages = Math.ceil(totalDocuments / limit);
  //     return {
  //       page,
  //       limit,
  //       totalPages,
  //       results: recipes,
  //     };
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     throw error;
  //   });

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

  const results = await listRecipes({ filter, settings });

  const total = await countRecipes({ owner });
  const totalPages = Math.ceil(total / limit);

  res.json({
    page,
    limit,
    totalPages,
    results,
  });
};

const createRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  if (!req.file) {
    throw HttpError(400, "thumb must have photo");
  }
  const { path, mimetype } = req.file;

  if (mimetype.split("/")[0] !== "image") {
    await fs.unlink(path);
    throw HttpError(400, "Unsupported file type");
  }
  const [thumb, preview] = await uploadRecipe(path);
  await fs.unlink(path);

  const newRecipe = await addRecipe({
    ...req.body,
    owner,
    thumb,
    preview,
  });

  res.json(newRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const result = await removeRecipe({ _id, owner });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const getPopular = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const popular = await getRecipes(skip, limit);
  res.json(popular);
};

const getFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const filter = { favorite: owner };
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const favorites = await listRecipes({ filter, settings });
  res.json(favorites);
};

const addFavorite = async (req, res) => {
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

const removeFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const recipe = await getRecipeById({ _id });
  if (!recipe) {
    throw HttpError(404, `Recipe with id: ${_id} not found`);
  }
  const { favorite } = recipe;
  if (!favorite.includes(userId)) {
    throw HttpError(409, `Recipe not in favorites`);
  }
  const result = await updateFavorites(_id, { $pull: { favorite: userId } });
  res.json(result);
};

export default {
  getQueryRecipes: ctrlWrapper(getQueryRecipes),
  getOneRecipe: ctrlWrapper(getOneRecipe),
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  createRecipe: ctrlWrapper(createRecipe),
  deleteRecipe: ctrlWrapper(deleteRecipe),
  getPopular: ctrlWrapper(getPopular),
  getFavorite: ctrlWrapper(getFavorite),
  addFavorite: ctrlWrapper(addFavorite),
  removeFavorite: ctrlWrapper(removeFavorite),
};
