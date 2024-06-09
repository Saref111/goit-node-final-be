import { Router } from "express";
import { authenticateToken, upload, validateId } from "../middlewares/index.js";
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

usersRouter.get("/current", authenticateToken, usersController.getCurrentUser);

usersRouter.get("/info", authenticateToken, userController.getOwnInfo);

usersRouter.get(
  "/info/:id",
  authenticateToken,
  validateId,
  userController.getUserInfo
);

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

usersRouter.get("/:id/followings", usersController.getFollowings);

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

usersRouter.post("/logout", authenticateToken, usersController.logout);

export default usersRouter;
