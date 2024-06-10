import { Router } from "express";
import { authenticateToken, upload, validateId } from "../middlewares/index.js";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../schemas/userSchema.js";
import { paginationSchema } from "../schemas/querySchema.js";
import validateBody from "../helpers/validateBody.js";
import validateQuery from "../helpers/validateQuery.js";
import usersController from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post(
  "/register",
  validateBody(userRegistrationSchema),
  usersController.register
);

usersRouter.post(
  "/login",
  validateBody(userLoginSchema),
  usersController.login
);

usersRouter.use(authenticateToken);

usersRouter.get("/current", usersController.getCurrentUser);

usersRouter.get("/info", usersController.getOwnInfo);

usersRouter.get("/info/:id", validateId, usersController.getUserInfo);

usersRouter.patch(
  "/avatars",
  upload.single("avatar"),
  usersController.updateAvatar
);

usersRouter.get(
  "/followers",
  validateQuery(paginationSchema),
  usersController.getOwnFollowers
);

usersRouter.get(
  "/followers/:id",
  validateId,
  validateQuery(paginationSchema),
  usersController.getFollowers
);

usersRouter.get(
  "/following",
  validateQuery(paginationSchema),
  usersController.getOwnFollowings
);

usersRouter.patch(
  "/addFollowing/:id",
  validateId,
  usersController.addFollowing
);

usersRouter.patch(
  "/removeFollowing/:id",
  validateId,
  usersController.removeFollowing
);

usersRouter.post("/logout", usersController.logout);

export default usersRouter;
