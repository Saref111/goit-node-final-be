import Recipe from "../models/Recipe.js";
export const searchRecipes = async ({ filter, settings }) =>
  Recipe.find(filter, "title description thumb favorite", settings).populate(
    "owner",
    "name avatar"
  );

export const getRecipe = (filter) => {
  return Recipe.findOne(filter)
    .populate("owner", "name avatar")
    .populate("ingredients.id")
    .populate("category", "-thumb -description")
    .populate("area");
};

export const listRecipes = (search) => {
  const { filter = {}, settings = {} } = search;
  return Recipe.find(filter, "_id title description thumb", settings);
};

export const countRecipes = (filter) => Recipe.countDocuments(filter);

export const removeRecipe = (filter) => Recipe.findOneAndDelete(filter);

export const addRecipe = (data) => Recipe.create(data);

export const getRecipes = (skip, limit) => {
  return Recipe.aggregate([
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
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    {
      $unwind: "$ownerDetails",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        thumb: 1,
        favorite: 1,
        owner: {
          _id: "$ownerDetails._id",
          name: "$ownerDetails.name",
          avatar: "$ownerDetails.avatar",
        },
      },
    },
  ]);
};

export const getRecipeById = (filter) => Recipe.findOne(filter);

export const updateFavorites = (id, settings) =>
  Recipe.findByIdAndUpdate(id, settings);
