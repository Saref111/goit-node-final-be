import Categories from "../models/Categories.js";

export const getAllCategories = () => Categories.find().sort({name: 1});


