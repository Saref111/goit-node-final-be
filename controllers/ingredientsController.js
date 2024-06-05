import ctrlWrapper from "../decorators/ctrlWrappe.js"
import HttpError from "../helpers/HttpError.js";
import Ingredients from "../models/Ingredients.js";
import { getIngredients, getOneIngredients } from "../services/ingredientsService.js";



const getAllIngredients = async(req, res) => {
const {page = 1, limit = 10} = req.query;
const skip = (page - 1 ) * limit;
const settings = {
    skip,
    limit
}
const total = await Ingredients.countDocuments({});
const ingredients = await getIngredients({filter: {}, fields: "", settings});

res.status(200).json({
    results: ingredients,
    total
})
}
const getIngredientsById = async(req, res) => {
const {id: _id} = req.params;
const filter = {
    _id
}

const results = await getOneIngredients({filter})
if(!results) {
    throw HttpError(404, `Ingredients with this id=${_id} not found`)
}
res.status(200).json({
    results
})
}

export default {
    getAllIngredients: ctrlWrapper(getAllIngredients),
    getIngredientsById: ctrlWrapper(getIngredientsById)
}