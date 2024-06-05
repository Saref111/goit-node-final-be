import { testimonialsList } from "../services/testimonialsServices.js";

export const getAllTestimonials = async (req, res, next) => {
  try {
    const result = await testimonialsList();

    res.json(result);
  } catch (error) {
    next(error);
  }
};
