const PrestationService = require("../service/PrestationService");
const TacheService = require("../service/TacheService");
const Tool = require("../utile/Tool");

class TacheController {
  constructor() {
    this.tache_service = new TacheService();
    this.prestation = new PrestationService();
    this.tool = new Tool();
  }
  create = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const tache = await this.tache_service.createTache(req.body);
          res.status(201).send({ droit: true, tache: tache });
        } else {
          res
            .status(403)
            .send({ droit: false, message: "Utilisateur non autorisé" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur interne du serveur." });
    }
  };
  addReparation = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 10) {
          const detail_rep = req.body.nouveauDetail;
          const det = await this.prestation.findById(detail_rep.prestation);
          detail_rep.prix = det.prix;
          detail_rep.prix_total = det.prix * detail_rep.quantite;
          const tache = await this.tache_service.addDetailsReparation(
            req.body.idTache,
            detail_rep
          );
          res.status(201).send({ droit: true, tache: tache });
        } else {
          res
            .status(403)
            .send({ droit: false, message: "Utilisateur non autorisé" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur interne du serveur." });
    }
  };
  addPiece = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 10) {
          const tache = await this.tache_service.addPieceToDetail(
            req.body.idTache,
            req.body.indexReparation,
            req.body.nouvellePiece
          );
          res.status(201).send({ droit: true, tache: tache });
        } else {
          res
            .status(403)
            .send({ droit: false, message: "Utilisateur non autorisé" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur interne du serveur." });
    }
  };
}

module.exports = TacheController;
