const mongoose = require("mongoose");

const Portefeuille = new mongoose.Schema(
  {
    valeur: { type: Number, required: true },
    idUtilisateur: {
      type: String,
      ref: "Utilisateur",
      required: true,
    },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portefeuille", Portefeuille);
