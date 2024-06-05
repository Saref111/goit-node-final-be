import { Router } from "express";
import {
  getPopular,
  addToFavorite,
  deleteFromFavorite,
  getFavorite,
} from "../controllers/recipesController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const recipesRouter = Router();

recipesRouter.get("/popular", getPopular);

recipesRouter.get("/favorite", authenticateToken, getFavorite);

recipesRouter.post("/favorite/:id", authenticateToken, addToFavorite);

recipesRouter.delete("/favorite/:id", authenticateToken, deleteFromFavorite);

export default recipesRouter;
