const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UtilisateurSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    statut: { type: Number, required: true },
    telephone: { type: String, required: false },
    validation_profil: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);
