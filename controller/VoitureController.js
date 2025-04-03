const VoitureService = require("../service/VoitureService");

class VoitureController {
  constructor() {
    this.voitureService = new VoitureService();
    this.createVoiture = this.createVoiture.bind(this);
    this.getVoituresByUtilisateur = this.getVoituresByUtilisateur.bind(this);
  }

  createVoiture = async (req, res) => {
    try {
      const data = req.body;
      const voiture = await this.voitureService.create(data);
      res.status(201).json(voiture);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getVoituresByUtilisateur = async (req, res) => {
    try {
      const { idUtilisateur } = req.params;
      const voitures = await this.voitureService.getByIdUtilisateur(
        idUtilisateur
      );
      res.status(200).json(voitures);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllVoiture = async (req, res) => {
    try {
      const liste = await this.voitureService.findAll();
      if (!liste || liste.length === 0) {
        return res.status(404).json({ message: "Aucune voiture." });
      }
      liste.forEach((voiture) => {
        console.log(` Voiture de: ${voiture.idUtilisateur}`);
      });
      res.status(200).json(liste);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getVoiture = async (req, res) => {
    try {
      console.log(req.params);
      const { query } = req.params;

      if (!query) {
        return res
          .status(400)
          .json({ message: "Taper un mot pour avoir le résultat." });
      }

      console.log("query : " + query);
      const voitures = await this.voitureService.getVoiture(query);

      return res.status(200).json(voitures);
    } catch (error) {
      console.error("Erreur lors de la récupération des voitures :", error);
      return res
        .status(500)
        .json({ message: "Erreur interne du serveur." + error });
    }
  };
}

module.exports = VoitureController;
