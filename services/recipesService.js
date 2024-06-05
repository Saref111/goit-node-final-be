import Recipe from "../models/Recipe.js";

export const getRecipes = () => Recipe.find();

// export const getRecipes = async (search = {}) => {
//   const { filter = {}, fields = "", settings = "" } = search;
//   return Recipe.find({ filter, fields, settings });
// };

export const getRecipe = (filter) => Recipe.findOne(filter);

export const updateFavorites = (filter, data) =>
  Recipe.findOneAndUpdate(filter, data);
