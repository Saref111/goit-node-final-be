import { Router } from "express";
import recipesControllers from "../controllers/recipesController.js";
import { authenticateToken } from "../middlewares/index.js";

const recipesRouter = Router();

recipesRouter.get("/popular", recipesControllers.getPopular);

recipesRouter.use(authenticateToken);

recipesRouter.get("/own", recipesControllers.getOwnRecipes);

recipesRouter.get("/favorite", recipesControllers.getFavorite);

recipesRouter.post("/favorite/:id", recipesControllers.addToFavorite);

recipesRouter.delete("/favorite/:id", recipesControllers.deleteFromFavorite);

export default recipesRouter;
