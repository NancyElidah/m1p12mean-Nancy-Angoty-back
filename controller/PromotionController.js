const PromotionService = require("../service/PromotionService");

class PromotionController {
  constructor() {
    this.promotionService = new PromotionService();
    this.createPromotion = this.createPromotion.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  createPromotion = async (req, res) => {
    try {
      console.log(req.body);
      const promotion = await this.promotionService.create(req.body);
      res.status(201).json(promotion);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  findAll = async (req, res) => {
    try {
      const liste = await this.promotionService.findAll();
      if (!liste || liste.length === 0) {
        console.log("tsy misy");
        return res.status(404).json({ message: "Aucune promotion." });
      }
      res.status(200).json(liste);
    } catch (error) {
      res.status(500).json({message: "Erreur, tsy misy promotion"});
    }
  };
}
module.exports = PromotionController;
