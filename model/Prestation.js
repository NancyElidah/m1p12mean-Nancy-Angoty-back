const mongoose = require("mongoose");

const Prestation = new mongoose.Schema(
  {
    intitule: { type: String, required: true },
    prestationType: { type: mongoose.Schema.Types.ObjectId, ref: "Propos", required: true },
    prix: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prestation", Prestation);
