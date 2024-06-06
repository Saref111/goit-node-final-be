import fs from "fs/promises";
import * as userService from "../services/usersService.js";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../decorators/index.js";
import { uploadAvatar } from "../helpers/cloudinary.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await userService.findUserByEmail(email);

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = await userService.createUser({ name, email, password });

  res.status(201).json({ user });
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
  const [avatar, avatar_preview] = await uploadAvatar(path);
  await fs.unlink(path);

  const user = await userService.updateUser(_id, { avatar, avatar_preview });
  res.json({ avatar: user.avatar, avatar_preview: user.avatar_preview });
};

const getAll = async (req, res) => {
  const result = await User.find();
  res.json(result);
};

const getFollowersById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw HttpError(404, `User with id=${id} not found`);
  }
  const result = user.followers;
  res.json(result);
};

const getFollowings = async (req, res) => {
  const { _id: userId } = req.user;
  const { following } = await User.findById(userId);
  res.json(following);
};

const addFollowing = async (req, res) => {
  const { id } = req.params;
  const { _id: currentUserId } = req.user;

  const followedUser = await User.findById(id);
  if (!followedUser) {
    throw HttpError(404, `User with id=${id} not found`);
  }

  const result = await User.findByIdAndUpdate(
    currentUserId,
    { $addToSet: { following: id } },
    {
      new: true,
    }
  );

  const followedUserUpdate = await User.findByIdAndUpdate(
    id,
    { $addToSet: { followers: currentUserId } },
    {
      new: true,
    }
  );

  res.json(result.following);
};

const removeFollowing = async (req, res) => {
  const { id } = req.params;
  const { _id: currentUserId } = req.user;

  const followedUser = await User.findById(id);
  if (!followedUser) {
    throw HttpError(404, `User with id=${id} not found`);
  }

  const result = await User.findByIdAndUpdate(
    currentUserId,
    { $pull: { following: id } },
    {
      new: true,
    }
  );

  const followedUserUpdate = await User.findByIdAndUpdate(
    id,
    { $pull: { followers: currentUserId } },
    {
      new: true,
    }
  );

  res.json(result.following);
};

export default {
  register: ctrlWrapper(register),
  updateAvatar: ctrlWrapper(updateAvatar),
  getAll: ctrlWrapper(getAll),
  getFollowersById: ctrlWrapper(getFollowersById),
  getFollowings: ctrlWrapper(getFollowings),
  addFollowing: ctrlWrapper(addFollowing),
  removeFollowing: ctrlWrapper(removeFollowing),
};
