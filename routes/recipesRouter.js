import express from "express";
import { searchQuerySchema } from "../schemas/querySchema.js";
import recipesController from "../controllers/recipesController.js";
import validateQuery from "../helpers/validateQuery.js";

const recipesRouter = express.Router();

recipesRouter.get(
  "/",
  validateQuery(searchQuerySchema),
  recipesController.getRecipes
);

export default recipesRouter;
