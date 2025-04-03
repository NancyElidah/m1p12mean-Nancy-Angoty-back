const PromotionService = require("../service/PromotionService");
const Tool = require("../utile/Tool");

class PromotionController {
  constructor() {
    this.promotionService = new PromotionService();
    this.tool = new Tool();
  }

  createPromotion = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const promotion = await this.promotionService.create(req.body);
          res.status(201).send({ droit: true, promotion: promotion });
        } else {
          res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
        }
      });
    }catch (error) {
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
