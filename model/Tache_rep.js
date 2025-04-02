const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const detailPieceSchema = new mongoose.Schema(
  {
    id_piece: { type: String, required: true },
    quantite: { type: Number, required: true },
    prix: { type: Number, required: true },
    prix_total: { type: Number, required: false },
  },
  { timestamps: true }
);

const detailReparationSchema = new mongoose.Schema(
  {
    prestation: { type: String, ref: "Prestation", required: true },
    quantite: { type: Number, required: true },
    prix: { type: Number, required: true },
    prix_total: { type: Number, required: true },
    paye: { type: Number, default: 0, required: false },
    date: { type: Date, required: false },
    commentaire: { type: String, required: false },
    details_pieces: [detailPieceSchema], // Liste des pièces associées à la réparation
  },
  { timestamps: true }
);

const tacheSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    id_voiture: { type: String, ref: "Voiture", required: true },
    date_attribution: { type: Date, required: true },
    date_reparation: { type: Date, required: false },
    prix_total: { type: Number, required: false },
    verdict_final: { type: String, required: false },
    id_mecanicien: { type: String, ref: "Utilisateur", required: true },
    reste: { type: Number, required: false },
    date_fin: { type: Date, required: false },
    details_rep: [detailReparationSchema], // Liste des réparations associées
  },
  { timestamps: true }
);

module.exports = mongoose.model("tache_rep", tacheSchema);
