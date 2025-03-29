const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const VoitureSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    immatriculation: { type: String, required: true, unique: true },
    idUtilisateur: { type: String, ref:"Utilisateur", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voiture", VoitureSchema);

