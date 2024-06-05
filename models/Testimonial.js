import { Schema, model } from "mongoose";

// _id: "647495d0c825f1570b04182e",
//    owner: {
//      _id: "64c8d958249fae54bae90bb8",
//      name: "Larry Pageim"
//   },
//   testimonial: ""

const testimonialSchema = new Schema(
  {
    testimonial: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const User = model("testimonial", testimonialSchema);

export default User;
