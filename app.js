const express = require("express");
const app = express();
const mongo = require("./config/dbMongo");
const UtilisateurController = require("./controller/UtilisateurController");
const PieceController = require("./controller/PieceController");
const VoitureController = require("./controller/VoitureController");
const ProposController = require("./controller/ProposController");
const PrestationController = require("./controller/PrestationController");
const PromotionController = require("./controller/PromotionController");
const TacheController = require("./controller/TacheController");

mongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});

// Utilisation du Router Express
const router = express.Router();
const userController = new UtilisateurController();
const piece = new PieceController();
const voiture = new VoitureController();
const propos = new ProposController();
const prestation = new PrestationController();
const promotion = new PromotionController();
const tache = new TacheController();

router.post("/user/create", userController.create_user);
router.get("/user/findAll", userController.findAll);
router.post("/user/login", userController.login);
router.put("/user/validation", userController.valid);

router.post("/piece/create", piece.create_piece);
router.get("/piece/", piece.findAll);
router.put("/piece/update", piece.update);
router.delete("/piece/delete", piece.delete);

router.post("/voiture/create", voiture.createVoiture);
router.get("/voiture/getByUser/:idUtilisateur",voiture.getVoituresByUtilisateur);
router.get("/voiture/findAll",voiture.findAll);

router.post("/propos/create", propos.createPropos);
router.get("/propos/findAll", propos.findAll);
router.put("/propos/update", propos.update);
router.delete("/propos/delete", propos.delete);

router.post("/prestation/create", prestation.createPrestation);
router.get("/prestation/findAll", prestation.findAll);
router.get("/prestation/getAll", prestation.getAll);
router.put("/prestation/update", prestation.update);
router.delete("/prestation/delete", prestation.delete);

router.post("/promotion/create", promotion.createPromotion);
router.get("/promotion/findAll", promotion.findAll);

router.post("/rendezvous/add", rendezvous.addRendezVous);
router.get("/rendezvous/findAll", rendezvous.findAll);
router.put("/rendezvous/validate", rendezvous.validate);
router.put("/rendezvous/update", rendezvous.update);


router.post("/tache", tache.create);
router.post("/tache/addDetailsRep", tache.addReparation);

router.get("/tache/findByDate", tache.findByDates);
router.get("/tache/findByMec", tache.findByMecanicien);
router.put("/tache/update", tache.update);
router.post("/tache/delete", tache.delete_tache);
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API déployée sur Vercel ! 🚀");
});
router.get("/tache/findAll", tache.getAll);
router.get("/tache/findAllEnAttente", tache.getAllEnAttente);
router.put("/tache/update_date", tache.update_date);
router.get("/tache/fin", tache.getAllFin);
router.get("/tache/en_cours", tache.getAllEnCours);
router.get("/tache/filtre_attente", tache.getTacheEnAttenteFiltre);
router.get("/tache/filtre_encours", tache.getAllEnCoursFiltre);
router.get("/tache/filtre_fin", tache.getAllFinFiltre);
app.use(router);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});


module.exports = app;