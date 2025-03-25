const Utilisateur = require("../model/Utilisateur");

class UtilisateurService {
  async create_utilisateur(data) {
    try {
      const user = new Utilisateur(data);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const user = await Utilisateur.find();
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UtilisateurService;
