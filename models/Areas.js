import { Schema, model } from "mongoose";


const areasSchema = new Schema({
    name: String
})


const Areas = model("areas", areasSchema);

export default Areas;