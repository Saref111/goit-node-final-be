import { Router } from "express";
import ingredientsController from "../controllers/ingredientsController.js";

const ingredientsRouter = Router();

ingredientsRouter.get("/", ingredientsController.getAllIngredients);

export default ingredientsRouter;