import * as userService from "../services/usersService.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await userService.findUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await userService.createUser({ name, email, password });
  
  res.status(201).json({ user });
};
