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
  getAll = async (req, res) => {
    try {
      const taches = await this.tache_service.getAllTaches();
      res.status(200).json(taches);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des tâches." + error,
      });
    }
  };
  getAllEnAttente = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const tache = await this.tache_service.getTacheEnAttente();
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
  update_date = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        console.log("user" + user);
        if (user.statut == 10) {
          const { idTache, date, type_date } = req.body;

          if (!["date_reparation", "date_fin"].includes(type_date)) {
            return res.status(400).send({ error: "Type de date invalide !" });
          }

          if (!idTache || !date) {
            return res
              .status(400)
              .send({ error: "ID de tâche et date requis !" });
          }

          const tache = await this.tache_service.updateDate(
            idTache,
            date,
            type_date
          );

          if (!tache) {
            return res.status(404).send({ error: "Tâche non trouvée !" });
          }

          res
            .status(200)
            .send({ message: "Tâche mise à jour avec succès", tache });
        } else {
          res.status(403).send({ error: "Utilisateur non autorisé" });
        }
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la date :", error);
      res.status(500).send({ error: "Erreur interne du serveur." });
    }
  };
  getAllFin = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const tache = await this.tache_service.getTacheFin();
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
  getAllEnCours = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const tache = await this.tache_service.getAllEnCour();
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
  getTacheEnAttenteFiltre = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);

        if (user.statut === 0 || user.statut === 10) {
          const { idMecanicien, date_attribution } = req.body;
          const taches = await this.tache_service.getTacheEnAttenteFiltre(
            idMecanicien,
            date_attribution
          );
          res.status(200).json({ success: true, taches });
        } else {
          res
            .status(403)
            .json({ success: false, message: "Utilisateur non autorisé" });
        }
      });
    } catch (error) {
      console.error("Erreur dans getTacheEnAttenteFiltre :", error);
      res
        .status(500)
        .json({ success: false, error: "Erreur interne du serveur." });
    }
  };
  getAllEnCoursFiltre = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);

        if (user.statut === 0 || user.statut === 10) {
          const { idMecanicien, date_attribution } = req.body;
          const taches = await this.tache_service.getTacheEnCours(
            idMecanicien,
            date_attribution
          );

          res.status(200).json({ success: true, taches });
        } else {
          res
            .status(403)
            .json({ success: false, message: "Utilisateur non autorisé" });
        }
      });
    } catch (error) {
      console.error("Erreur dans getAllEnCours :", error);
      res
        .status(500)
        .json({ success: false, error: "Erreur interne du serveur." });
    }
  };
  getAllFinFiltre = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);

        if (user.statut === 0) {
          const { idMecanicien, date_attribution } = req.body;
          const taches = await this.tache_service.getTacheFinFiltre(
            idMecanicien,
            date_attribution
          );

          res.status(200).json({ success: true, taches });
        } else {
          res
            .status(403)
            .json({ success: false, message: "Utilisateur non autorisé" });
        }
      });
    } catch (error) {
      console.error("Erreur dans getAllEnCours :", error);
      res
        .status(500)
        .json({ success: false, error: "Erreur interne du serveur." });
    }
  };
}

module.exports = TacheController;
