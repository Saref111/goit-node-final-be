import { testimonialsList } from "../services/testimonialsServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllTestimonials = async (req, res, next) => {
  const result = await testimonialsList();
  res.json(result);
};

export default {
  getAllTestimonials: ctrlWrapper(getAllTestimonials),
};
