const CategoryModel = require("../model/CategoryModel");

const createCategoryService = async (req) => {
  try {
    let reqBody = req.body;
    await CategoryModel.create(reqBody);
    return { status: "success", message: "data crate success" };
  } catch (error) {
    if (error.code === 11000) {
      return { status: "fail", message: "Category name already exists" };
    }
    return { status: "fail", message: "Data creation failed" };
  }
};

const readCategoryService = async () => {
  try {
    let data = await CategoryModel.find();
    const totalCount = data.length; // Calculate total data
    return { status: "success", data: data, totalCount: totalCount };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};

module.exports = {
  createCategoryService,
  readCategoryService,
};
