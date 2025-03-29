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

  async update_user(data) {
    try {
      await Utilisateur.update(data, { where: { id: data.id } });

      const updatedUser = await Utilisateur.findOne({ where: { id: data.id } });

      console.log("Utilisateur mis à jour:", updatedUser);
      return updatedUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async find_user_by_email(email) {
    try {
      const user = await Utilisateur.findOne({ email: email });
      console.log(" Utilisateur trouvé par email :", user);
      return user;
    } catch (err) {
      console.error("Erreur lors de la recherche de l'utilisateur :", err);
      throw err;
    }
  }

  async validation_profil(id) {
    try {
      const updatedUser = await Utilisateur.findOneAndUpdate(
        { _id: id },
        { $set: { validation_profil: 1 } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Utilisateur introuvable");
      }

      console.log("Utilisateur mis à jour:", updatedUser);
      return updatedUser;
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      throw err;
    }
  }
  async find_user_by_id(id) {
    try {
      const user = await Utilisateur.findById(id);

      if (!user) {
        throw new Error("Utilisateur introuvable");
      }

      console.log("Utilisateur trouvé:", user);
      return user;
    } catch (err) {
      console.error("Erreur lors de la recherche de l'utilisateur:", err);
      throw err;
    }
  }
}

module.exports = UtilisateurService;
