const {
  createCategoryService,
  readCategoryService,
} = require("../services/CategoryService");

exports.createCategory = async (req, res) => {
  const result = await createCategoryService(req);
  res.status(201).json(result); // Respond with the result of the service
};
exports.readCategory = async (req, res) => {
  let result = await readCategoryService(req);
  res.status(200).json(result);
};
