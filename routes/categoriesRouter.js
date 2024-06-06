import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getCategories);

export default categoriesRouter;