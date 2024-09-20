const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const CategoryModel = model("categories", DataSchema);
module.exports = CategoryModel;
