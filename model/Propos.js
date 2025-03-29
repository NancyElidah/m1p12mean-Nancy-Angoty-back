const mongoose = require("mongoose");

const ProposSchema = new mongoose.Schema(
  {
    intitule: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Propos", ProposSchema);
