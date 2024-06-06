import { Schema, model } from "mongoose";

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

const Testimonial = model("testimonial", testimonialSchema);

export default Testimonial;
