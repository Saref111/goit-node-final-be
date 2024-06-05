import ctrlWrappe from "../decorators/ctrlWrappe.js"
import HttpError from "../helpers/HttpError.js";
import Categories from "../models/Categories.js";
import { getAllCategories, getByIdCategories } from "../services/categoriesService.js";


const getCategories = async (req, res) => {
const {page = 1, limit = 10} = req.query;
const skip = (page - 1) * limit;
const settings = {
    limit,
    skip
}
const total = await Categories.countDocuments({});
const categories = await getAllCategories({filter: {}, fields: "", settings});
res.status(200).json({
    results: categories,
    total
});
}

const getOneCategories = async (req, res) => {
const {id} = req.params;
const filter = {_id: id};
const results = await getByIdCategories({filter});
if(!results) {
    throw HttpError(404, `Categories with this id=${id} not found`)
}
res.status(200).json({
    results
})
}

export default {
    getCategories: ctrlWrappe(getCategories),
    getOneCategories: ctrlWrappe(getOneCategories)
}