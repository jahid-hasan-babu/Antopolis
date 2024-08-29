const {
  createCategoryService,
  readCategoryService,
} = require("../services/CategoryService");

exports.createCategory = async (req, res) => {
  let result = await createCategoryService(req);
  res.status(201).json(result);
};

exports.readCategory = async (req, res) => {
  let result = await readCategoryService(req);
  res.status(200).json(result);
};
