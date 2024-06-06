import ctrlWrappe from "../decorators/ctrlWrappe.js"
import Categories from "../models/Categories.js";
import { getAllCategories } from "../services/categoriesService.js";

const getCategories = async (req, res) => {
const total = await Categories.countDocuments({});
const categories = await getAllCategories();
res.status(200).json({
    results: categories,
    total
});
}

export default {
    getCategories: ctrlWrappe(getCategories)
}