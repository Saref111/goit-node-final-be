import { Router } from "express";
import { authenticateToken, upload } from "../middlewares/index.js";
import userController from "../controllers/usersController.js";
import validateBody from "../helpers/validateBody.js";
import { userRegistrationSchema } from "../schemas/userSchema.js";

const usersRouter = Router();

usersRouter.post(
  "/register",
  validateBody(userRegistrationSchema),
  userController.register
);

usersRouter.get("/", userController.getAll);

usersRouter.patch(
  "/avatars",
  authenticateToken,
  upload.single("avatar"),
  userController.updateAvatar
);

usersRouter.get(
  "/:id/followers",
  authenticateToken,
  userController.getFollowersById
);

usersRouter.get("/followings", authenticateToken, userController.getFollowings);

usersRouter.patch(
  "/addFollowing/:id",
  authenticateToken,
  userController.addFollowing
);

usersRouter.patch(
  "/removeFollowing/:id",
  authenticateToken,
  userController.removeFollowing
);

export default usersRouter;
