import { testimonialsList } from "../services/testimonialsServices.js";
import ctrlWrappe from "../decorators/ctrlWrappe.js";

const getAllTestimonials = async (req, res, next) => {
  const result = await testimonialsList();
  res.json(result);
};

export default {
  getAllTestimonials: ctrlWrappe(getAllTestimonials),
};
