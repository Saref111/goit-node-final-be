import { Router } from "express";
import { register } from "../controllers/usersController.js";
import validateBody from "../helpers/validateBody.js";
import { userRegistrationSchema } from "../schemas/userSchema.js";

const usersRouter = Router();

usersRouter.post("/register", validateBody(userRegistrationSchema), register);

export default usersRouter;
