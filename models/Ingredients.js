import { Schema, model } from "mongoose";

const ingredientsSchema = new Schema( {
    name: String,
    desc: String,
    img: String
})


const Ingredients = model("ingredients", ingredientsSchema);

export default Ingredients;