import { Router } from "express";
import recipesControllers from "../controllers/recipesController.js";
import { authenticateToken } from "../middlewares/index.js";
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

recipesRouter.get("/favorite", recipesControllers.getFavorite);

recipesRouter.post("/favorite/:id", recipesControllers.addToFavorite);

recipesRouter.delete("/favorite/:id", recipesControllers.deleteFromFavorite);

export default recipesRouter;
