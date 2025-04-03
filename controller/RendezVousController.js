const RendezVousService = require("../service/RendezVousService");
const Tool = require("../utile/Tool");

class RendezVousController {
  constructor() {
    this.rendezVous = new RendezVousService();
    this.tool = new Tool();
  }

  addRendezVous = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 20) {
          const rendezVous = await this.rendezVous.create(req.body);
          res.status(201).send({ droit: true, rendezVous: rendezVous });
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
        await this.tool.verifyToken(req, res, async () => {
            const user = await this.tool.get_user_online(req);
            if (user.statut == 0) {
                const rendezVous = await this.rendezVous.findAll();
                res.status(200).json({rendezVous: rendezVous});
            } else {
                 res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
            }
        });
    } catch (error) {
      console.error("Error fetching prestations:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des prestations." });
    }
  };

  validate = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 0) {
          const rendezVous = await this.rendezVous.validate(req.body);
          res.status(201).send({ droit: true, rendezVous: rendezVous });
        } else {
          res.status(403).send({ droit: false, message: "Utilisateur non autorisé." });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur interne du serveur." });
    }
  };

  update = async (req, res) => {
    try {
      await this.tool.verifyToken(req, res, async () => {
        const user = await this.tool.get_user_online(req);
        if (user.statut == 20) {
          const rendezVous = await this.rendezVous.update(req.body);
          res.status(201).send({ droit: true, rendezVous: rendezVous });
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
module.exports = RendezVousController;
