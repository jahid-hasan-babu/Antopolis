const {
  createAnimalService,
  readAllAnimalService,
  readAnimalsByCategoryService,
} = require("../services/AnimalService");

exports.createAnimal = async (req, res) => {
  let result = await createAnimalService(req);
  res.status(201).json(result);
};

exports.readAllAnimal = async (req, res) => {
  let result = await readAllAnimalService(req);
  res.status(200).json(result);
};

exports.readAllAnimalByCategory = async (req, res) => {
  let result = await readAnimalsByCategoryService(req);
  res.status(200).json(result);
};
