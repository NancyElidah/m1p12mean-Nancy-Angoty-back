const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const uri = "mongodb://127.0.0.1:27017/garage";

    await mongoose.connect(uri);
    console.log("✅ Connexion réussie à MongoDB");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB:", error);
    throw error;
  }
};

module.exports = connectToDatabase;
