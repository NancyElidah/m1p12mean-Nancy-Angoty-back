const Portefeuille = require("../model/Portefeuille");

class PortefeuilleService {
  async create_portefeuille(data) {
    try {
      const portefeuille = new Portefeuille(data);
      return await portefeuille.save();
    } catch (error) {
      throw new Error(
        "Erreur lors de la création du portefeuille : " + error.message
      );
    }
  }

  async findAll(skip, limit) {
    try {
      return await Portefeuille.find().skip(skip).limit(limit);
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des portefeuilles : " + error.message
      );
    }
  }

  async countPortefeuilles() {
    try {
      return await Portefeuille.countDocuments();
    } catch (error) {
      throw new Error(
        "Erreur lors du comptage des portefeuilles : " + error.message
      );
    }
  }

  async update_portefeuille(data) {
    try {
      const updatedPortefeuille = await Portefeuille.findByIdAndUpdate(
        data._id,
        data,
        {
          new: true,
        }
      );
      if (!updatedPortefeuille) {
        throw new Error("Portefeuille non trouvé pour la mise à jour");
      }
      return updatedPortefeuille;
    } catch (error) {
      throw new Error(
        "Erreur lors de la mise à jour du portefeuille : " + error.message
      );
    }
  }

  async delete_portefeuille(id) {
    try {
      const deletedPortefeuille = await Portefeuille.findByIdAndDelete(id);
      if (!deletedPortefeuille) {
        throw new Error("Portefeuille non trouvé pour la suppression");
      }
      return deletedPortefeuille;
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression du portefeuille : " + error.message
      );
    }
  }

  async findById(id) {
    try {
      const portefeuille = await Portefeuille.findById(id);
      if (!portefeuille) {
        throw new Error("Portefeuille non trouvé");
      }
      return portefeuille;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération du portefeuille : " + error.message
      );
    }
  }

  async findByUtilisateur(idUtilisateur, skip, limit) {
    try {
      return await Portefeuille.find({ idUtilisateur })
        .skip(skip)
        .limit(limit)
        .sort({ date: -1 });
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des portefeuilles de l'utilisateur : " +
          error.message
      );
    }
  }
}

module.exports = PortefeuilleService;
