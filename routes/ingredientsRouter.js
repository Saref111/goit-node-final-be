import { Router } from "express";
import ingredientsController from "../controllers/ingredientsController.js";

const ingredientsRouter = Router();

ingredientsRouter.get("/", ingredientsController.getAllIngredients);
ingredientsRouter.get("/:id", ingredientsController.getIngredientsById)

export default ingredientsRouter;