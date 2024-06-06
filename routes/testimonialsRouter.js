import { Router } from "express";
import testimonialsCtrl from "../controllers/testimonialsController.js";

const testimonialsRouter = Router();

testimonialsRouter.get("/", testimonialsCtrl.getAllTestimonials);

export default testimonialsRouter;
