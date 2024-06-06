import Recipe from "../models/Recipe.js";
export const listRecipes = (search = {}) => {
  const { filter = {}, fields = "", settings = {} } = search;
  console.log(filter);
  return Recipe.find(filter, "id title description thumb", settings).populate(
    "owner",
    "name avatar"
  );
};
