import fs from "fs/promises";
import * as userService from "../services/usersService.js";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import createToken from "../helpers/createToken.js";
import Recipe from "../models/Recipe.js";


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findUserByEmail(email);
  if (!user || !(await user.isPasswordValid(password))) {
    throw HttpError(400, "Invalid credentials");
  }
  const token = createToken(user);
  await userService.updateToken(user._id, token);
  res.json({
    user: {
      name: user.name,
      avatar: user.avatar || null,
      favorites: user.favorites || [],
    },
    token,
  });
};

const getCurrentUser = async (req, res) => {
  const { user } = req;
  const currentUser = await userService.findUserById(user._id);
  res.json({
    user: {
      name: currentUser.name,
      avatar: currentUser.avatar || null,
      favorites: currentUser.favorites || [],
    },
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await userService.findUserByEmail(email);

  if (existingUser) {
    throw HttpError(400, "User already exists");
  }

  const user = await userService.createUser({ name, email, password });

  res.status(201).json({
    user: {
      name: user.name,
      avatar: user.avatar || null,
      favotires: user.favorites || [],
    },
    token: user.token,
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

const logout = async (req, res) => {
  const { _id: userId } = req.user;
  await userService.updateToken(userId, null);
  res.status(204).send();
}

const getInfo = async (req, res) => {
  const { id } = req.params
  const currentUserId = "64c8d958249fae54bae90bb9";
  try {
    const candidate = await User.findOne({ token: id })
    if (candidate) {
      const recipes = await Recipe.find({ owner: candidate._id })
      if (candidate.token === id) {
        res.status(200).json({
          avatar: candidate.avatar,
          name: candidate.name,
          email: candidate.email,
          recipes: recipes ? recipes : [],
          followers: candidate.followers.length,
          following: candidate.following.length
        })
      } else {
        res.status(200).json({
          avatar: candidate.avatar,
          name: candidate.name,
          email: candidate.email,
          recipes: recipes ? recipes.length : 0,
          following: candidate.following.length
        })
      }
    } else {
      throw new Error("User not found")
    }
  } catch (e) {
    res.status(404).json({
      message: e
    })
  }

}

export default {
  register: ctrlWrapper(register),
  updateAvatar: ctrlWrapper(updateAvatar),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  getAll: ctrlWrapper(getAll),
  getFollowersById: ctrlWrapper(getFollowersById),
  getFollowings: ctrlWrapper(getFollowings),
  addFollowing: ctrlWrapper(addFollowing),
  removeFollowing: ctrlWrapper(removeFollowing),
  logout: ctrlWrapper(logout),
  getInfo: ctrlWrapper(getInfo),
};
