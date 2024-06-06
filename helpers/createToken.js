import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default createToken;
