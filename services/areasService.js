import Area from "../models/Area.js";
export const getAreas = () => Area.find().sort({ name: 1 });
