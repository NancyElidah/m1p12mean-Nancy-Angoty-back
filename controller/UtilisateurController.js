const UtilisateurService = require("../service/Utilisateur_service");

class UtilisateurController {
  constructor() {
    this.utilisateurService = new UtilisateurService();
    this.create_user = this.create_user.bind(this);
    this.findAll = this.findAll.bind(this);
  }
  create_user = async (req, res) => {
    try {
      console.log(req.body);
      const new_user = await this.utilisateurService.create_utilisateur(
        req.body
      );
      console.log("ici user", new_user.toJSON());

      res.status(201).send({ auth: true, user: new_user });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  findAll = async (req, res) => {
    try {
      console.log(" Récupération des utilisateurs...");
      const all_user = await this.utilisateurService.findAll();
      console.log(` ${all_user.length} utilisateurs trouvés.`);

      if (!all_user || all_user.length === 0) {
        console.log(" Aucun utilisateur trouvé.");
        return res.status(404).json({ message: "Aucun utilisateur trouvé." });
      }

      // 🔍 Afficher les noms des utilisateurs
      all_user.forEach((user) => {
        console.log(` Utilisateur : ${user.nom} ${user.prenom}`);
      });

      res.status(200).json(all_user);
    } catch (error) {
      console.error(" Erreur dans findAll :", error);
      res.status(500).json({
        message: "Erreur serveur. Impossible de récupérer les utilisateurs.",
      });
    }
  };
}
module.exports = UtilisateurController;
