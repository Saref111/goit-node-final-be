import { Router } from "express";
import { authenticateToken, upload } from "../middlewares/index.js";
// import {
//   register,
//   getAll,
//   getFollowersById,
//   getFollowings,
//   addFollowing,
// } from "../controllers/usersController.js";

import userController from "../controllers/usersController.js";
import validateBody from "../helpers/validateBody.js";
import { userRegistrationSchema } from "../schemas/userSchema.js";

const usersRouter = Router();

// usersRouter.use(authenticateToken);

usersRouter.post(
  "/register",
  validateBody(userRegistrationSchema),
  userController.register
);

usersRouter.get("/", userController.getAll);

usersRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticateToken,
  userController.updateAvatar
);

usersRouter.get("/:id/followers", userController.getFollowersById);

// змінити коли буде авторизований user -->
// ----------------------------------------------------
// usersRouter.get("/followings", userController.getFollowings);
usersRouter.get("/:id/followings", userController.getFollowings);
// ----------------------------------------------------

usersRouter.patch("/addFollowing/:id", userController.addFollowing);

usersRouter.patch("/removeFollowing/:id", userController.removeFollowing);

export default usersRouter;
