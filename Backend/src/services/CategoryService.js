const CategoryModel = require("../model/CategoryModel");

const createCategoryService = async (req) => {
  try {
    const { categoryName } = req.body;

    // Check if category already exists
    const existingCategory = await CategoryModel.findOne({ categoryName });
    if (existingCategory) {
      return { status: "fail", message: "Category name already exists" };
    }

    // If category doesn't exist, create a new category
    const newCategory = await CategoryModel.create({ categoryName });

    return {
      status: "success",
      message: "Category created successfully",
      data: newCategory,
    };
  } catch (error) {
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
