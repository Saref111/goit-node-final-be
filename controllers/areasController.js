import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { getAreas } from "../services/areasService.js";

const getAllAreas = async (req, res) => {
  const areas = await getAreas();
  res.json(areas);
};

export default {
  getAllAreas: ctrlWrapper(getAllAreas),
};
