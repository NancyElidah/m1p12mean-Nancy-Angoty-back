const PortefeuilleService = require("../service/PortefeuilleService");

class PortefeuilleController {
  constructor() {
    this.portefeuille_service = new PortefeuilleService();
  }

  addPortefeuille = async (req, res) => {
    try {
      console.log(req.body);
      const portefeuille = await this.portefeuille_service.create_portefeuille(
        req.body
      );
      res.status(201).json(portefeuille);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
}
module.exports = PortefeuilleController;
