import Testimonial from "../models/Testimonial.js";

export const testimonialsList = () =>
  Testimonial.find().populate("owner", "name");
