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
  
  async findAll(skip, limit) {
    try {
      return await Voiture.find().skip(skip).limit(limit).populate('idUtilisateur', '_id nom prenom');
    } catch (error) {
      throw error;
    }
  }

  async findById(idUtilisateur, skip, limit) {
    try {
        const voitures = await Voiture.find({ idUtilisateur }).skip(skip).limit(limit).populate('idUtilisateur');
        return voitures;
    } catch (error) {
        throw error;
    }
  }

  async countVoiture() {
    try {
      return await Voiture.countDocuments();
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = VoitureService;
