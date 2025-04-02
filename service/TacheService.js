const Tache = require("../model/Tache_rep");

class TacheService {
  async createTache(data) {
    try {
      const tache = new Tache(data);
      return await tache.save();
    } catch (error) {
      throw error;
    }
  }
  async addDetailsReparation(idTache, nouveauDetail) {
    const tache = await Tache.findById(idTache);
    if (!tache) {
      console.log("Tâche non trouvée");
      return;
    }

    tache.details_rep.push(nouveauDetail);
    await tache.save();

    console.log("Détail de réparation ajouté :", tache);
  }
  async addPieceToDetail(idTache, indexReparation, nouvellePiece) {
    const tache = await Tache.findById(idTache);
    if (!tache) {
      console.log("Tâche non trouvée");
      return;
    }
    tache.details_rep[indexReparation].details_pieces.push(nouvellePiece);
    await tache.save();

    console.log("Pièce ajoutée :", tache);
  }
  async updatePrixTotal(idTache, prix) {
    try {
      const tache = await Tache.findById(idTache);
      if (!tache) {
        return { success: false, message: "Tâche non trouvée" };
      }
      const nouveauPrixTotal = (tache.prix_total || 0) + prix;
      tache.prix_total = nouveauPrixTotal;
      const updatedTache = await tache.save();
      return { success: true, data: updatedTache };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du prix total :", error);
      return { success: false, message: "Erreur serveur" };
    }
  }
  async findAll(skip, limit) {
    try {
      return await Tache.find().sort({ _id: -1 }).skip(skip).limit(limit);
    } catch (error) {
      throw error;
    }
  }
  async findByDates(dateAttribution, dateReparation, skip, limit) {
    try {
      let query = {};
      if (dateAttribution) query.date_attribution = new Date(dateAttribution);
      if (dateReparation) query.date_reparation = new Date(dateReparation);

      return await Tache.find(query).sort({ _id: -1 }).skip(skip).limit(limit);
    } catch (error) {
      throw error;
    }
  }
  async findByMecanicien(idMecanicien, skip, limit) {
    try {
      return await Tache.find({ id_mecanicien: idMecanicien })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);
    } catch (error) {
      throw error;
    }
  }
  async updateTache(data) {
    try {
      return await Tache.findByIdAndUpdate(data._id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }
  async deleteTache(id) {
    try {
      return await Tache.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
  async getAllTaches() {
    try {
      const taches = await Tache.find()
        .populate("id_voiture")
        .populate("id_mecanicien")
        .exec();

      console.log(taches);
      return taches;
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches:", error);
    }
  }
  async getTacheEnAttente() {
    try {
      const taches = await Tache.find({ date_reparation: null })
        .populate("id_voiture")
        .populate("id_mecanicien")
        .exec();

      console.log(taches);
      return taches;
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches:", error);
    }
  }
  async updateDate(idTache, date, type_date) {
    try {
      if (!["date_reparation", "date_fin"].includes(type_date)) {
        throw new Error("Type de date invalide !");
      }

      const tache = await Tache.findByIdAndUpdate(
        idTache,
        { [type_date]: date },
        { new: true }
      );

      if (!tache) {
        console.log("Aucune tâche trouvée avec cet ID");
        return null;
      }

      console.log("Tâche mise à jour :", tache);
      return tache;
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  }
  async getTacheFin() {
    try {
      const taches = await Tache.find({ date_fin: { $ne: null } })
        .populate("id_voiture")
        .populate("id_mecanicien")
        .exec();

      console.log(taches);
      return taches;
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches:", error);
    }
  }
  async getAllEnCour() {
    try {
      const taches = await Tache.find({
        date_fin: null,
        date_reparation: { $ne: null },
      })
        .populate("id_voiture")
        .populate("id_mecanicien")
        .exec();

      console.log(taches);
      return taches;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des tâches en cours :",
        error
      );
    }
  }
  async getTacheEnAttenteFiltre(idMecanicien = null, date_attribution = null) {
    try {
      let filtre = { date_fin: null, date_reparation: null };

      if (idMecanicien) {
        filtre.id_mecanicien = idMecanicien;
      }

      if (date_attribution) {
        filtre.date_attribution = date_attribution;
      }

      const taches = await Tache.find(filtre)
        .populate("id_voiture")
        .populate("id_mecanicien")
        .exec();

      console.log(taches);
      return taches;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des tâches en attente :",
        error
      );
    }
  }
  async getTacheEnCours(idMecanicien = null, date_attribution = null) {
    try {
      let filtre = {
        date_fin: null,
        date_reparation: { $ne: null },
      };

      if (idMecanicien) {
        filtre.id_mecanicien = idMecanicien;
      }

      if (date_attribution) {
        filtre.date_attribution = date_attribution;
      }

      const taches = await Tache.find(filtre)
        .populate("id_voiture")
        .populate("id_mecanicien")
        .exec();

      console.log(taches);
      return taches;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des tâches en cours :",
        error
      );
    }
  }
  async getTacheFinFiltre(idMecanicien = null, date_attribution = null) {
    try {
      let filtre = {
        date_fin: { $ne: null },
      };

      if (idMecanicien) {
        filtre.id_mecanicien = idMecanicien;
      }

      if (date_attribution) {
        filtre.date_attribution = date_attribution;
      }

      const taches = await Tache.find(filtre)
        .populate("id_voiture")
        .populate("id_mecanicien")
        .exec();

      console.log(taches);
      return taches;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des tâches en cours :",
        error
      );
    }
  }
}

module.exports = TacheService;
