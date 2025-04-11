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
// const connectToDatabase = async () => {
//   try {
//     const uri = "mongodb+srv://angotyrabarijaona:6dDnCQ6QpLdc0pze@garage.cod6mdw.mongodb.net/garage?retryWrites=true&w=majority";
    
//     await mongoose.connect(uri);
//     console.log("✅ Connexion réussie à MongoDB");
//   } catch (error) {
//     console.error("❌ Erreur de connexion à MongoDB:", error);
//     throw error;
//   }
// };

module.exports = connectToDatabase;
