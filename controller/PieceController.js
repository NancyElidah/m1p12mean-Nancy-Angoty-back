const PieceService = require("../service/Piece_service");
const Tool = require("../utile/Tool");

class PieceController {
  constructor() {
    this.piece_service = new PieceService();
    this.tool = new Tool();
  }

  create_piece = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const piece = await this.piece_service.create_piece(req.body);
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

  findAll = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Validation des paramètres de pagination
      if (page < 1 || limit < 1) {
        return res.status(400).json({
          message: "Les paramètres de pagination doivent être supérieurs à 0.",
        });
      }

      // Calculer l'offset pour la pagination
      const skip = (page - 1) * limit;

      const pieces = await this.piece_service.findAll(skip, limit);

      const totalPieces = await this.piece_service.countPieces();
      const totalPages = Math.ceil(totalPieces / limit);

      res.status(200).json({
        pieces: pieces,
        totalPieces: totalPieces,
        totalPages: totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.error("Error fetching pieces:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des pièces." });
    }
  };
  update = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const piece = await this.piece_service.update_piece(req.body);
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
  delete = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);

        if (user.statut == 0) {
          const { id } = req.body;
          if (!id) {
            return res.status(400).send({ error: "ID requis" });
          }

          const piece = await this.piece_service.delete_piece(id);
          if (!piece) {
            return res.status(404).send({ error: "Pièce non trouvée" });
          }

          res.status(200).send({ droit: true, message: "Pièce supprimé" });
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

module.exports = PieceController;
