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
}

module.exports = TacheService;
