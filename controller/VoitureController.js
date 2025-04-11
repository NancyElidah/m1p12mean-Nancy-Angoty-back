const VoitureService = require("../service/VoitureService");
const Tool = require("../utile/Tool");

class VoitureController {
  constructor() {
    this.voitureService = new VoitureService();
    this.tool = new Tool();
  }

  createVoiture = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 20) {
          const voiture = await this.voitureService.create(req.body);
          res.status(201).send({ droit: true, voiture: voiture });
        } else {
          res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  getVoituresByUtilisateur = async (req, res) => {
    try {
      const { idUtilisateur } = req.params;
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 20) {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          if (page < 1 || limit < 1) {
            return res.status(400).json({message: "Les paramètres de pagination doivent être supérieurs à 0.",});
          }
          const skip = (page - 1) * limit;
          const voitures = await this.voitureService.findById(idUtilisateur, skip, limit);
          const totalVoiture = await this.voitureService.countVoiture();
          const totalPages = Math.ceil(totalVoiture / limit);
          res.status(200).json({voiture: voitures, totalVoiture: totalVoiture, totalPages: totalPages,currentPage: page,});
        } else {
          res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
        }
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  findAll = async (req, res)=>{
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          if (page < 1 || limit < 1) {
            return res.status(400).json({ message: "Les paramètres de pagination doivent être supérieurs à 0.",});
          }
          const skip = (page - 1) * limit;
          const voiture = await this.voitureService.findAll(skip, limit);
          const totalVoiture = await this.voitureService.countVoiture();
          const totalPages = Math.ceil(totalVoiture / limit);
          res.status(200).json({ voiture: voiture, totalVoiture: totalVoiture, totalPages: totalPages,currentPage: page,});
        } else {
          res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
        }
    });

    } catch (error) {
      console.error("Error fetching voitures:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des voitures." });
    }
  }
}

module.exports = VoitureController;
