import ctrlWrapper from "../decorators/ctrlWrappe.js";
import Areas from "../models/Areas.js";
import { getAreas } from "../services/areasService.js";

const getAllAreas = async(req, res) => {
    const total = await Areas.countDocuments({});
    const areas = await getAreas();
    res.status(200).json({
        results: areas,
        total
    })
}

export default {
    getAllAreas: ctrlWrapper(getAllAreas)
};