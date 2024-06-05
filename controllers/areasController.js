import ctrlWrapper from "../decorators/ctrlWrappe.js";
import HttpError from "../helpers/HttpError.js";
import Areas from "../models/Areas.js";
import { getAreas, getByIdArea } from "../services/areasService.js";

const getAllAreas = async(req, res) => {
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const settings = {
        skip,
        limit
    }

    const total = await Areas.countDocuments({});
    const areas = await getAreas({filter: {}, fields: "", settings});
    res.status(200).json({
        results: areas,
        total
    })
}

const getOneArea = async(req, res) => {
const {id} = req.params;
const filter = {_id: id};

const results = await getByIdArea({filter});
if(!results) {
    throw HttpError(404, `Area with this id=${id} not found`)
}
res.status(200).json({
    results
})
}

export default {
    getAllAreas: ctrlWrapper(getAllAreas),
    getOneArea: ctrlWrapper(getOneArea)
};