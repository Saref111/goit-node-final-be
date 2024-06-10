import { Schema, model } from "mongoose";
import hooks from "./hooks.js";

const userSchema = new Schema(
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
      type: [Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: "user",
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

const User = model("user", userSchema);

export default User;
