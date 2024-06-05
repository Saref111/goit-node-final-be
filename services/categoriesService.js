import Categories from "../models/Categories.js";


export const getAllCategories = (search = {}) => {
const {filter = {}, fields = "", settings = {}} = search;
return Categories.find(filter, fields, settings);
}

export const getByIdCategories = (search = {}) => {
    const {filter} = search;
    return Categories.findOne(filter);
}