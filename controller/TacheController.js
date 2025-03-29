const PieceService = require("../service/Piece_service");
const PrestationService = require("../service/PrestationService");
const TacheService = require("../service/TacheService");
const Tool = require("../utile/Tool");

class TacheController {
  constructor() {
    this.tache_service = new TacheService();
    this.prestation = new PrestationService();
    this.piece_service = new PieceService();
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
          await this.tache_service.updatePrixTotal(
            req.body.idTache,
            detail_rep.prix_total
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
          const piece = req.body.nouvellePiece;
          const piece_base = await this.piece_service.findById(piece.id_piece);
          piece.prix = piece_base.prix;
          piece.prix_total = piece_base.prix * piece.quantite;
          const tache = await this.tache_service.addPieceToDetail(
            req.body.idTache,
            req.body.indexReparation,
            piece
          );
          await this.tache_service.updatePrixTotal(
            req.body.idTache,
            piece.prix_total
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
  findAll = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const taches = await this.tache_service.findAll(skip, limit);
      res.status(200).json({ taches: taches, currentPage: page });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des tâches." });
    }
  };
  findByDates = async (req, res) => {
    try {
      const { page, limit } = req.query;
      const { dateAttribution, dateReparation } = req.body;
      page = parseInt(req.query.page) || 1;
      limit = parseInt(req.query.limit) || 10;
      const skip = (parseInt(page) - 1) * parseInt(limit) || 0;

      const taches = await this.tache_service.findByDates(
        dateAttribution,
        dateReparation,
        skip,
        parseInt(limit)
      );
      res.status(200).json({ taches: taches });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des tâches par date.",
      });
    }
  };
  findByMecanicien = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const idMecanicien = req.body.idMecanicien;

      const skip = (parseInt(page) - 1) * parseInt(limit);

      if (isNaN(skip) || isNaN(parseInt(limit))) {
        return res
          .status(400)
          .json({ message: "Paramètres de pagination invalides" });
      }

      const taches = await this.tache_service.findByMecanicien(
        idMecanicien,
        skip,
        parseInt(limit)
      );

      res.status(200).json({ taches });
    } catch (error) {
      res.status(500).json({
        message:
          "Erreur lors de la récupération des tâches du mécanicien : " + error,
      });
    }
  };
  delete_tache = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const tache = await this.tache_service.deleteTache(req.body.id);
          res
            .status(200)
            .send({ droit: true, message: "Tâche supprimée", tache });
        } else {
          res
            .status(403)
            .send({ droit: false, message: "Utilisateur non autorisé" });
        }
      });
    } catch (error) {
      res.status(500).send({ error: "Erreur interne du serveur." });
    }
  };
  update = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const piece = await this.tache_service.updateTache(req.body);
          res.status(201).send({ droit: true, piece: piece });
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
