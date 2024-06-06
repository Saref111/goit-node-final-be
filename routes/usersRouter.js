import { Router } from "express";
import { authenticateToken, upload } from "../middlewares/index.js";
import userController from "../controllers/usersController.js";
import validateBody from "../helpers/validateBody.js";
import usersController from "../controllers/usersController.js";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../schemas/userSchema.js";

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

usersRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticateToken,
  userController.updateAvatar
);

usersRouter.get("/:id/followers", userController.getFollowersById);

usersRouter.get("/current", authenticateToken, usersController.getCurrentUser);

usersRouter.get("/", usersController.getAll);

usersRouter.get("/:id/followers", usersController.getFollowersById);

usersRouter.get("/:id/followings", usersController.getFollowings);

usersRouter.patch("/addFollowing/:id", usersController.addFollowing);

usersRouter.patch("/removeFollowing/:id", usersController.removeFollowing);

export default usersRouter;
