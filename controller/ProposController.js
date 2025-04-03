const ProposService = require("../service/ProposService");
const Prestation = require("../model/Prestation");
const Tool = require("../utile/Tool");

class ProposController {
  constructor() {
    this.proposService = new ProposService();
    this.tool = new Tool();
  }

  createPropos = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const propos = await this.proposService.create(req.body);
          res.status(201).send({ droit: true, propos: propos });
        } else {
          res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
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
      const propos = await this.proposService.findAll(skip, limit);
      const totalPropos = await this.proposService.countPropos();
      const totalPages = Math.ceil(totalPropos / limit);
      res.status(200).json({propos: propos, totalPropos: totalPropos, totalPages: totalPages, currentPage: page,});
    } catch (error) {
      console.error("Error fetching propos:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des propos." });
    }
  };

  update = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const propos = await this.proposService.update(req.body);
          res.status(201).send({ droit: true, propos: propos });
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
          const prestationsExist = await Prestation.exists({ prestationType: id });
          if (prestationsExist) {
            return res.status(400).send({
              error: "Impossible de supprimer ce propos car des prestations y sont liées.",
            });
          }
          const propos = await this.proposService.delete(id);
          if (!propos) {
            return res.status(404).send({ error: "Propos non trouvée." });
          }
          res.status(200).send({ droit: true, message: "Propos supprimé." });
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
module.exports = ProposController;
