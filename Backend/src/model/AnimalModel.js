const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const AnimalModel = model("animals", DataSchema);
module.exports = AnimalModel;
