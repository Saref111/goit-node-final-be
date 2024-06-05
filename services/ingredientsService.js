import Ingredients from "../models/Ingredients.js";

export const getIngredients = (search = {}) => {
  const { filter = {}, fields = "", settings = {} } = search;
  return Ingredients.find(filter, fields, settings);
};

export const getOneIngredients = (search = {}) => {
  const { filter } = search;
  return Ingredients.findById("6462a6cd4c3d0ddd28897f8c");
};
