const ProposService = require("../service/ProposService");

class ProposController {
  constructor() {
    this.proposService = new ProposService();
    this.createPropos = this.createPropos.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  createPropos = async (req, res) => {
    try {
      console.log(req.body);
      const propos = await this.proposService.create(req.body);
      res.status(201).json(propos);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  findAll = async (req, res) => {
    try {
      const liste = await this.proposService.findAll();
      if (!liste || liste.length === 0) {
        console.log("tsy misy");
        return res.status(404).json({ message: "Aucune proposition de reparation." });
      }
      res.status(200).json(liste);
    } catch (error) {
      res.status(500).json({message: "Erreur, tsy misy propos"});
    }
  };
}
module.exports = ProposController;
