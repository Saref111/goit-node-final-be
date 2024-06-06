import mongoose from "mongoose";
import hooks from "./hooks.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    avatar_preview: {
      type: String,
      default: null,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);

userSchema.methods.isPasswordValid = function (password) {
  return this.password === password;
};


userSchema.post("save", hooks.handleSaveError);
userSchema.pre("findOneAndUpdate", hooks.setUpdateSettings);
userSchema.post("findOneAndUpdate", hooks.handleSaveError);

const User = mongoose.model("user", userSchema);

export default User;
