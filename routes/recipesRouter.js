import { Router } from "express";
import {
  authenticateToken,
  upload,
  isEmptyBody,
  validateId,
} from "../middlewares/index.js";
import { recipeCreateSchema } from "../schemas/recipeSchema.js";
import { querySchema, paginationSchema } from "../schemas/querySchema.js";
import validateBody from "../helpers/validateBody.js";
import validateQuery from "../helpers/validateQuery.js";
import recipesControllers from "../controllers/recipesController.js";

const recipesRouter = Router();

recipesRouter.get(
  "/",
  validateQuery(querySchema),
  recipesControllers.getQueryRecipes
);

recipesRouter.get("/details/:id", validateId, recipesControllers.getOneRecipe);

recipesRouter.get("/popular", recipesControllers.getPopular);

recipesRouter.use(authenticateToken);

recipesRouter.get(
  "/own",
  validateQuery(paginationSchema),
  recipesControllers.getOwnRecipes
);

recipesRouter.get(
  "/own/:id",
  validateId,
  validateQuery(paginationSchema),
  recipesControllers.getOwnRecipes
);

recipesRouter.post(
  "/own",
  upload.single("thumb"),
  isEmptyBody,
  validateBody(recipeCreateSchema),
  recipesControllers.createRecipe
);

recipesRouter.delete("/own/:id", validateId, recipesControllers.deleteRecipe);

recipesRouter.get(
  "/favorite",
  validateQuery(paginationSchema),
  recipesControllers.getFavorite
);

recipesRouter.patch(
  "/addFavorite/:id",
  validateId,
  recipesControllers.addFavorite
);

recipesRouter.patch(
  "/removeFavorite/:id",
  validateId,
  recipesControllers.removeFavorite
);

export default recipesRouter;
