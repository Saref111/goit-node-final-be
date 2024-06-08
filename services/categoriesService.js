<<<<<<< HEAD
import Categories from "../models/Categories.js";

export const getAllCategories = () => Categories.find().sort({name: 1});

=======
import Category from "../models/Category.js";
>>>>>>> c308331 (fixed models (area, ingredien, category, recipe), fixed imports in areas, ingrediens, categories, recipes services fixed res.json return)

export const getAllCategories = () => Category.find();
