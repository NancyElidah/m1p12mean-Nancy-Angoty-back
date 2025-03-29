const PrestationService = require("../service/PrestationService");

class PrestationController {
  constructor() {
    this.prestationService = new PrestationService();
    this.createPrestation = this.createPrestation.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updatePrix = this.updatePrix.bind(this);
  }

  createPrestation = async (req, res) => {
    try {
      console.log(req.body);
      const prestation = await this.prestationService.create(req.body);
      res.status(201).json(prestation);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  findAll = async (req, res) => {
    try {
      const liste = await this.prestationService.findAll();
      if (!liste || liste.length === 0) {
        console.log("tsy misy");
        return res.status(404).json({ message: "Aucune prestation." });
      }
      res.status(200).json(liste);
    } catch (error) {
      res.status(500).json({message: "Erreur, tsy misy prestation"});
    }
  };

    updatePrix = async (req, res) => {
        try {
            const data = req.body;
            const nouvellePrestation = await this.prestationService.update(data); 
            res.status(200).json(nouvellePrestation); 
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
module.exports = PrestationController;
