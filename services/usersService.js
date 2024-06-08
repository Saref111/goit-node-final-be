import User from '../models/User.js';
import createToken from '../helpers/createToken.js';

export const createUser = async (user) => {
    const newUser = new User({...user});
    await newUser.save();
    
    const token = createToken(newUser);
    console.log('token', token);
    const newUserWithToken = await updateToken(newUser._id, token);
    console.log('newUserWithToken', newUserWithToken);
    return newUserWithToken;
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

export const updateUser = (id, data) => User.findByIdAndUpdate(id, data);
