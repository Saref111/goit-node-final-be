import Areas from "../models/Areas.js";



export const getAreas = (search = {}) => {
    const {filter = {}, fields = "", settings = {}} = search;
    return Areas.find(filter, fields, settings);
}

export const getByIdArea = (search = {}) => {
    const {filter} = search;
    return Areas.findOne(filter);
}