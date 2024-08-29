const CategoryModel = require("../model/CategoryModel");

const createCategoryService = async (req) => {
  try {
    let reqBody = req.body;
    await CategoryModel.create(reqBody);
    return { status: "success", message: "data crate success" };
  } catch (error) {
    return { status: "fail", message: "data crate fail" };
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
