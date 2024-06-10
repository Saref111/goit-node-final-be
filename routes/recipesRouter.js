import { Router } from "express";
import recipesControllers from "../controllers/recipesController.js";

import {
  authenticateToken,
  upload,
  isEmptyBody,
  validateId,
} from "../middlewares/index.js";

import { recipeCreateSchema } from "../schemas/recipeSchema.js";
import validateBody from "../helpers/validateBody.js";
import validateQuery from "../helpers/validateQuery.js";
import { querySchema } from "../schemas/querySchema.js";
const recipesRouter = Router();
recipesRouter.get(
  "/",
  validateQuery(querySchema),
  recipesControllers.getQueryRecipes
);
recipesRouter.get("/details/:id", validateId, recipesControllers.getOneRecipe);
recipesRouter.get("/popular", recipesControllers.getPopular);

recipesRouter.use(authenticateToken);

recipesRouter.get("/own", recipesControllers.getOwnRecipes);

recipesRouter.get("/own/:id", validateId, recipesControllers.getOwnRecipes);

recipesRouter.post(
  "/own",
  upload.single("thumb"),
  isEmptyBody,
  validateBody(recipeCreateSchema),
  recipesControllers.createRecipe
);

recipesRouter.delete("/own/:id", validateId, recipesControllers.deleteRecipe);

recipesRouter.get("/favorite", recipesControllers.getFavorite);

recipesRouter.patch("/addFavorite/:id", recipesControllers.addFavorite);

recipesRouter.patch("/removeFavorite/:id", recipesControllers.removeFavorite);

export default recipesRouter;
