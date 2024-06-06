import ctrlWrapper from "../decorators/ctrlWrappe.js"
import Ingredients from "../models/Ingredients.js";
import { getIngredients } from "../services/ingredientsService.js";

const getAllIngredients = async(req, res) => {
const total = await Ingredients.countDocuments({});
const ingredients = await getIngredients();

res.status(200).json({
    results: ingredients,
    total
})
}

export default {
    getAllIngredients: ctrlWrapper(getAllIngredients)
}