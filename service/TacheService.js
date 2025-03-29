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
}

module.exports = TacheService;
