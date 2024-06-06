import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();
  const token = createToken(newUser);
  await updateToken(newUser._id, token);
  return newUser;
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

export const updateUser = (id, data) => User.findByIdAndUpdate(id, data);
