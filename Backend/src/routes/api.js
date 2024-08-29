const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/CategoryController");
const AnimalController = require("../controller/AnimalController");

//category
router.post("/create-category", CategoryController.createCategory);
router.get("/read-category", CategoryController.readCategory);

//animal
router.post("/create-animal", AnimalController.createAnimal);
router.get("/readAll-animal", AnimalController.readAllAnimal);
router.get(
  "/readAll-animal-bycategory/:category",
  AnimalController.readAllAnimalByCategory
);
module.exports = router;
