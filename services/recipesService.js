import Recipe from "../models/Recipe.js";

export const listRecipes = (search) => {
  const { filter = {}, settings = {} } = search;
  return Recipe.find(filter, "_id title description thumb", settings);
};

export const getRecipes = (skip, limit, filterId) => {
  const matchStage = filterId ? { favorite: filterId } : {};
  return Recipe.aggregate([
    {
      $match: matchStage,
    },
    {
      $addFields: {
        favoriteLength: {
          $cond: {
            if: { $isArray: "$favorite" },
            then: { $size: "$favorite" },
            else: 0,
          },
        },
      },
    },
    {
      $sort: { favoriteLength: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);
};

export const getRecipeById = (filter) => Recipe.findOne(filter);

export const updateFavorites = (id, settings) =>
  Recipe.findByIdAndUpdate(id, settings);
