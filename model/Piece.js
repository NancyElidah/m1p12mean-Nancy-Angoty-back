const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const piece_schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    intitule: { type: String, required: true },
    prix: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("piece", piece_schema);
