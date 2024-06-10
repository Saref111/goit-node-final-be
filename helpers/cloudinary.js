import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadAvatar = async (image) => {
  const {
    eager: [normal, preview],
  } = await cloudinary.uploader.upload(image, {
    resource_type: "image",
    folder: "avatars",
    width: 240,
    height: 240,
    crop: "fill",
    gravity: "face",
    eager: [
      { fetch_format: "auto", format: "" },
      { width: 100, height: 100, fetch_format: "auto", format: "" },
    ],
  });

  return [normal.secure_url, preview.secure_url];
};

const uploadRecipe = async (image) => {
  const {
    eager: [normal, preview],
  } = await cloudinary.uploader.upload(image, {
    resource_type: "image",
    folder: "recipes",
    width: 700,
    height: 700,
    crop: "fill",
    gravity: "auto",
    eager: [
      { fetch_format: "auto", format: "" },
      { width: 200, height: 200, fetch_format: "auto", format: "" },
    ],
  });

  return [normal.secure_url, preview.secure_url];
};

export default { uploadAvatar, uploadRecipe };
