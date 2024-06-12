import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadAvatar = async (image) => {
  const { public_id } = await cloudinary.uploader.upload(image, {
    resource_type: "image",
    folder: "avatars",
    format: "jpg",
    width: 240,
    height: 240,
    crop: "fill",
    gravity: "face",
  });

  return public_id;
};

const uploadRecipe = async (image) => {
  const { public_id } = await cloudinary.uploader.upload(image, {
    resource_type: "image",
    folder: "recipes",
    format: "jpg",
    width: 700,
    height: 700,
    crop: "fill",
    gravity: "auto",
  });

  return public_id;
};

export default { uploadAvatar, uploadRecipe };
