import {Schema, model} from "mongoose";


const categoriesSchema = new Schema({
    name: String
})

const Categories = model("categories", categoriesSchema);

export default Categories;