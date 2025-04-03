const Voiture = require("../model/Voiture");
const Utilisateur = require("../model/Utilisateur");

class VoitureService {
  async create(data) {
    try {
      const utilisateur = await Utilisateur.findById(data.idUtilisateur);
      if (!utilisateur) {
        throw new Error("Utilisateur non trouvé");
      }
      const voiture = new Voiture({
        immatriculation: data.immatriculation,
        idUtilisateur: utilisateur._id,
      });
      return await voiture.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const voitures = await Voiture.find();
      return voitures;
    } catch (error) {
      throw error;
    }
  }
  async getByIdUtilisateur(idUtilisateur) {
    try {
      const voitures = await Voiture.find({ idUtilisateur }).populate(
        "idUtilisateur"
      );
      return voitures;
    } catch (error) {
      throw error;
    }
  }
  async getVoiture(query) {
    try {
      const voitures = await Voiture.find({
        immatriculation: { $regex: query, $options: "i" },
      });
      return voitures;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VoitureService;
