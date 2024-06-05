import Ingredients from "../models/Ingredients.js";



export const getIngredients = (search = {}) => {
    const {filter = {}, fields = "", settings = {}} = search;
    return Ingredients.find(filter, fields, settings);
}

export const getOneIngredients = (search = {}) => {
const {filter} = search;
return Ingredients.findOne(filter);
}