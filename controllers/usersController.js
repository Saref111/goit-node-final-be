import fs from "fs/promises";
import * as userService from "../services/usersService.js";
import * as recipeServices from "../services/recipesService.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import cloudinary from "../helpers/cloudinary.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await userService.findUser({ email });

  if (existingUser) {
    throw HttpError(409, "User already exists");
  }

  const user = await userService.createUser({ name, email, password });

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      following: user.following,
    },
    token: user.token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findUser({ email });
  if (!user || !(await user.isPasswordValid(password))) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id, name, avatar, following, token } = await userService.updateToken(
    user._id
  );

  res.json({
    user: {
      id: _id,
      name,
      avatar,
      following,
    },
    token,
  });
};

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const { name, avatar, following } = await userService.findUserById(_id);
  res.json({ id: _id, name, avatar, following });
};

const getOwnInfo = async (req, res) => {
  const { _id, name, email, avatar, followers, following } = req.user;
  const [recipes, favorites] = await Promise.all([
    recipeServices.countRecipes({ owner: _id }),
    recipeServices.countRecipes({ favorites: _id }),
  ]);

  res.json({
    name,
    email,
    avatar,
    recipes,
    favorites,
    followers: followers.length,
    following,
  });
};

const getUserInfo = async (req, res) => {
  const { id: _id } = req.params;
  const [user, recipes] = await Promise.all([
    userService.findUserById(_id),
    recipeServices.countRecipes({ owner: _id }),
  ]);

  if (!user) {
    throw HttpError(404, `User id ${_id} not found`);
  }

  const { name, email, avatar, followers } = user;

  res.json({
    name,
    email,
    avatar,
    recipes,
    followers: followers.length,
  });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Image not found");
  }
  const { _id } = req.user;
  const { path, mimetype } = req.file;

  if (mimetype.split("/")[0] !== "image") {
    await fs.unlink(path);
    throw HttpError(400, "Unsupported file type");
  }
  const avatar = await cloudinary.uploadAvatar(path);
  await fs.unlink(path);

  const user = await userService.updateUser(_id, { avatar });
  res.json({ avatar: user.avatar });
};

const getOwnFollowers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { _id } = req.user;

  const result = await userService.getUsers(
    _id,
    "followers",
    Number(page),
    Number(limit)
  );

  res.json(result);
};

const getFollowers = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { id } = req.params;
  const user = await userService.findUserById(id);
  if (!user) {
    throw HttpError(404, `User id ${id} not found`);
  }

  const result = await userService.getUsers(
    user._id,
    "followers",
    Number(page),
    Number(limit)
  );

  res.json(result);
};

const getOwnFollowings = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { _id } = req.user;

  const result = await userService.getUsers(
    _id,
    "following",
    Number(page),
    Number(limit)
  );

  res.json(result);
};

const addFollowing = async (req, res) => {
  const { id } = req.params;
  const { _id, following } = req.user;
  if (id === _id.toString()) {
    throw HttpError(409, "Can't follow yourself");
  }
  if (following.includes(id)) {
    throw HttpError(409, `User id ${id} is already followed`);
  }
  const isUser = await userService.findUserById(id);
  if (!isUser) {
    throw HttpError(404, `User id ${id} not found`);
  }

  const [newUser] = await Promise.all([
    userService.updateUser(_id, { $addToSet: { following: id } }),
    userService.updateUser(id, { $addToSet: { followers: _id } }),
  ]);

  res.json({ following: newUser.following });
};

const removeFollowing = async (req, res) => {
  const { id } = req.params;
  const { _id, following } = req.user;
  if (!following.includes(id)) {
    throw HttpError(404, `User id ${id} is not followed`);
  }

  const [newUser] = await Promise.all([
    userService.updateUser(_id, { $pull: { following: id } }),
    userService.updateUser(id, { $pull: { followers: _id } }),
  ]);

  res.json({ following: newUser.following });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await userService.updateUser(_id, { token: null });
  res.status(204).send();
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  getOwnInfo: ctrlWrapper(getOwnInfo),
  getUserInfo: ctrlWrapper(getUserInfo),
  updateAvatar: ctrlWrapper(updateAvatar),
  getOwnFollowers: ctrlWrapper(getOwnFollowers),
  getFollowers: ctrlWrapper(getFollowers),
  getOwnFollowings: ctrlWrapper(getOwnFollowings),
  addFollowing: ctrlWrapper(addFollowing),
  removeFollowing: ctrlWrapper(removeFollowing),
  logout: ctrlWrapper(logout),
};
