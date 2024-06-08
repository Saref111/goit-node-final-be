import { Schema, model } from "mongoose";

const testimonialSchema = new Schema(
  {
    testimonial: {
      type: String,
      required: [true, "Testimonial is required"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Owner is required"],
    },
  },
  { versionKey: false }
);

const Testimonial = model("testimonial", testimonialSchema);

export default Testimonial;
