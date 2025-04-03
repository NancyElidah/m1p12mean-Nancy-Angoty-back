const PrestationService = require("../service/PrestationService");
const Tool = require("../utile/Tool");

class PrestationController {
  constructor() {
    this.prestationService = new PrestationService();
    this.tool = new Tool();
  }

  createPrestation = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const prestation = await this.prestationService.create(req.body);
          res.status(201).send({ droit: true, prestation: prestation });
        } else {
          res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  getAll = async (req, res) => {
    try {
      
      const prestation = await this.prestationService.findAll();
      res.status(200).json({prestation: prestation});
    } catch (error) {
      console.error("Error fetching prestations:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des prestations." });
    }
  };
  
  findAll = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      if (page < 1 || limit < 1) {
        return res.status(400).json({message: "Les paramètres de pagination doivent être supérieurs à 0.",});
      }
      const skip = (page - 1) * limit;
      const prestation = await this.prestationService.findAll(skip, limit);
      const totalPrestation = await this.prestationService.countPrestation();
      const totalPages = Math.ceil(totalPrestation / limit);
      res.status(200).json({prestation: prestation, totalPrestation: totalPrestation, totalPages: totalPages, currentPage: page});
    } catch (error) {
      console.error("Error fetching prestations:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des prestations." });
    }
  };

  update = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const prestation = await this.prestationService.update(req.body);
          res.status(201).send({ droit: true, prestation: prestation });
        } else {
          res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
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
          const prestation = await this.prestationService.delete(id);
          if (!prestation) {
            return res.status(404).send({ error: "Prestation non trouvée." });
          }
          res.status(200).send({ droit: true, message: "Prestation supprimée." });
        } else {
          res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur interne du serveur." });
    }
  };
}
module.exports = PrestationController;
