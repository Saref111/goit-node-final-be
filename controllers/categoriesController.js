import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { getAllCategories } from "../services/categoriesService.js";

const getCategories = async (req, res) => {
  const categories = await getAllCategories();
  res.json(categories);
};

export default {
  getCategories: ctrlWrapper(getCategories),
};
