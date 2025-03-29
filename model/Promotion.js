const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const PromotionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    intitule: { type: String, required: true },
    debut: { type: Date, required: true },
    fin: { type: Date, required: true },
    pourcentage: { type: Number, required: true }, 
    idPrestation: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"Prestation" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", PromotionSchema);
