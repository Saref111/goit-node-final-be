import Ingredients from "../models/Ingredients.js";

export const getIngredients = () =>  Ingredients.find().sort({name: 1});

