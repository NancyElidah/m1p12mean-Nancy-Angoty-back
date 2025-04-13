const PromotionService = require("../service/PromotionService");
const Tool = require("../utile/Tool");

class PromotionController {
  constructor() {
    this.promotionService = new PromotionService();
    this.tool = new Tool();
  }

  createPromotion = async (req, res) => {
    try {
      // await this.tool.verifyToken(req, res, async () => {
      //   const user = await this.tool.get_user_online(req);
      //   if (user.statut == 0) {
          const promotion = await this.promotionService.create(req.body);
          // res.status(201).send({ droit: true, promotion: promotion });
          res.status(201).send({ promotion: promotion });
      //   } else {
      //     res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
      //   }
      // });
    }catch (error) {
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
      const promotion = await this.promotionService.findAll(skip, limit);
      const totalPromotion = await this.promotionService.countPromotion();
      const totalPages = Math.ceil(totalPromotion / limit);
      res.status(200).json({promotion: promotion, totalPromotion: totalPromotion, totalPages: totalPages, currentPage: page});
    } catch (error) {
      console.error("Error fetching promotions:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des promotions." });
    }
  };

  validate = async (req, res) => {
    try {
      const id = req.body.id;
      if (!id) {
        return res.status(400).send({ message: "ID de la promotion requis." });
      }
      const promotion = await this.promotionService.validate(id); 
      res.status(200).send({ message: "Statut mis à jour avec succès.", promotion });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur interne du serveur." });
    }
  }; 

  retirer = async (req, res) => {
    try {
      // await this.tool.verifyToken(req, res, async () => {
      //   const user = await this.tool.get_user_online(req);
      //   if (user.statut == 0) {
          const { id } = req.body;
          if (!id) {
            return res.status(400).send({ error: "ID requis" });
          }
          const promotion = await this.promotionService.delete(id);
          if (!promotion) {
            return res.status(404).send({ error: "Promotion non trouvée." });
          }
          res.status(200).send({ message: "Promotion supprimée." });
      //   } else {
      //     res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
      //   }
      // });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur interne du serveur." });
    }
  };
}
module.exports = PromotionController;
