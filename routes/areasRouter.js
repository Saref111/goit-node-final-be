import { Router } from "express";
import areasController from "../controllers/areasController.js";

const areasRouter = Router();

areasRouter.get("/", areasController.getAllAreas);

export default areasRouter;