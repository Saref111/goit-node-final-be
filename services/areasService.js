import Areas from "../models/Areas.js";

export const getAreas = () => Areas.find().sort({ name: 1 });

