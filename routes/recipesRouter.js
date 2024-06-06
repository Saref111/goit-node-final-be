<<<<<<< HEAD
import { Router } from "express";
import recipesControllers from "../controllers/recipesController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const recipesRouter = Router();

recipesRouter.get("/popular", recipesControllers.getPopular);

recipesRouter.use(authenticateToken);

recipesRouter.get("/favorite", recipesControllers.getFavorite);

recipesRouter.post("/favorite/:id", recipesControllers.addToFavorite);

recipesRouter.delete("/favorite/:id", recipesControllers.deleteFromFavorite);
=======
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
>>>>>>> abb3784 (added ricipes controller, added recipes service,  added recipes route, added recipes router,  added validateQuery middleware, added validateQuerySchema, fixed mongoose schema,)

export default recipesRouter;
