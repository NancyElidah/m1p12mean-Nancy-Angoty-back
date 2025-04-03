const mongoose = require("mongoose");

const Rendez_vous = new mongoose.Schema(
  {
    idVoiture: { type: String, ref: "Voiture", required: true },
    idPrestation: { type: String, ref: "Prestation", required: true },
    date_rendez_vous: { type: Date, required: true },
    validation_rendez_vous: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rendez_vous", Rendez_vous);
