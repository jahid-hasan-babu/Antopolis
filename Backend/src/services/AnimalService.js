const AnimalModel = require("../model/AnimalModel");
const cloudinary = require("../utility/cloudinary");

const createAnimalService = async (req) => {
  try {
    // Extract data from request
    const { name, category, image } = req.body;

    // Upload image if provided
    let imageUrl = null;
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "addsImage",
      });
      if (!uploadRes || !uploadRes.secure_url) {
        throw new Error("Image upload failed");
      }
      imageUrl = uploadRes.secure_url;
    }

    // Create new add document
    const animal = new AnimalModel({
      name,
      category,
      image: imageUrl,
    });

    // Save add document
    const savedAnimal = await animal.save();

    return {
      status: "success",
      message: "Data created successfully",
      data: savedAnimal,
    };
  } catch (error) {
    console.error("Error during data creation:", error);
    return {
      status: "fail",
      message: error.message || "Error during data creation",
    };
  }
};

const readAllAnimalService = async () => {
  try {
    let data = await AnimalModel.find();
    const totalCount = data.length; // Calculate total data
    return { status: "success", data: data, totalCount: totalCount };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};

const readAnimalsByCategoryService = async (req) => {
  try {
    let Category = req.params.category;
    let data = await AnimalModel.find({ category: Category });
    const totalCount = data.length;
    return { status: "success", data: data, totalCount: totalCount };
  } catch (error) {
    return { status: "fail", message: error.toString() };
  }
};

module.exports = {
  createAnimalService,
  readAllAnimalService,
  readAnimalsByCategoryService,
};
