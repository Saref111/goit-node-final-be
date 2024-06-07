const countDocuments = (model, search) => {
  return model.countDocuments(search.filter, search.options);
};
export default countDocuments;
