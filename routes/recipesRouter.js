import { Router } from "express";
import recipesControllers from "../controllers/recipesController.js";
import {
  authenticateToken,
  upload,
  isEmptyBody,
} from "../middlewares/index.js";

import { recipeCreateSchema } from "../schemas/recipeSchema.js";
import validateBody from "../helpers/validateBody.js";
import validateQuery from "../helpers/validateQuary.js";
import { querySchema } from "../schemas/querySchema.js";

const recipesRouter = Router();
recipesRouter.get(
  "/",
  validateQuery(querySchema),
  recipesControllers.getQueryRecipes
);
recipesRouter.get("/:id", recipesControllers.getOneRecipe);
recipesRouter.get("/popular", recipesControllers.getPopular);

recipesRouter.use(authenticateToken);

recipesRouter.get("/own", recipesControllers.getOwnRecipes);

recipesRouter.post(
  "/own",
  upload.single("thumb"),
  isEmptyBody,
  validateBody(recipeCreateSchema),
  recipesControllers.createRecipe
);

recipesRouter.get("/favorite", recipesControllers.getFavorite);

recipesRouter.post("/favorite/:id", recipesControllers.addToFavorite);

recipesRouter.delete("/favorite/:id", recipesControllers.deleteFromFavorite);

export default recipesRouter;
