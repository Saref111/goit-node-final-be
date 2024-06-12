import User from "../models/User.js";
import createToken from "../helpers/createToken.js";

export const createUser = async (user) => {
  const newUser = new User({ ...user });
  await newUser.save();

  const token = createToken(newUser._id);
  const newUserWithToken = await updateToken(newUser._id, token);
  return newUserWithToken;
};

export const updateToken = async (id) => {
  const token = createToken(id);
  return await User.findByIdAndUpdate({ _id: id }, { token });
};

export const findUser = (params) => User.findOne(params);

export const findUserById = (id) => User.findById(id);

export const updateUser = (id, data) => User.findByIdAndUpdate(id, data);

export const getUsers = (id, field, page, limit) =>
  User.aggregate([
    {
      $match: {
        _id: id,
      },
    },
    {
      $unwind: `$${field}`,
    },
    {
      $lookup: {
        from: "users",
        localField: field,
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $unwind: "$userData",
    },
    {
      $lookup: {
        from: "recipes",
        localField: "userData._id",
        foreignField: "owner",
        as: "recipesData",
      },
    },
    {
      $project: {
        _id: 0,
        id: "$userData._id",
        name: "$userData.name",
        avatar: "$userData.avatar",
        recipes: {
          $map: {
            input: { $slice: ["$recipesData", 4] },
            as: "recipe",
            in: {
              id: "$$recipe._id",
              thumb: "$$recipe.thumb",
            },
          },
        },
      },
    },
    {
      $facet: {
        metadata: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
            },
          },
        ],
        data: [
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
      },
    },
    {
      $addFields: {
        page: page,
        limit: limit,
      },
    },
    {
      $project: {
        page: 1,
        limit: 1,
        totalPages: {
          $cond: [
            { $eq: [{ $size: "$metadata.total" }, 0] },
            0,
            {
              $ceil: {
                $divide: [{ $arrayElemAt: ["$metadata.total", 0] }, limit],
              },
            },
          ],
        },
        results: "$data",
      },
    },
  ]).then((result) => {
    return result[0];
  });
