import { Router } from "express";
import areasController from "../controllers/areasController.js";

const areasRouter = Router();

areasRouter.get("/", areasController.getAllAreas);
areasRouter.get("/:id", areasController.getOneArea)

export default areasRouter;