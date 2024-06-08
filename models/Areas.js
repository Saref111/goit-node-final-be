import { Schema, model } from "mongoose";

const areasSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  { versionKey: false }
);

const Areas = model("areas", areasSchema);

export default Areas;
