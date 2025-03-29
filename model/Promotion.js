const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema(
  {
    intitule: { type: String, required: true },
    debut: { type: Date, required: true },
    fin: { type: Date, required: true },
    pourcentage: { type: Number, required: true }, 
    idPrestation: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"Prestation" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", PromotionSchema);
