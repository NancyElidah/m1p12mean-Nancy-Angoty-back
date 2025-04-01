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
const voitureController = new VoitureController();
const proposController = new ProposController();
const prestationController = new PrestationController();
const promotionController = new PromotionController();
const tache = new TacheController();

router.post("/user/create", userController.create_user);
router.get("/user/findAll", userController.findAll);
router.post("/user/login", userController.login);
router.put("/user/validation", userController.valid);

router.post("/piece/create", piece.create_piece);
router.get("/piece/", piece.findAll);
router.put("/piece/update", piece.update);
router.post("/piece/delete", piece.delete);

router.post("/voiture/create", voitureController.createVoiture);
router.get(
  "/voiture/getByUser/:idUtilisateur",
  voitureController.getVoituresByUtilisateur
);

router.post("/propos/create", proposController.createPropos);
router.get("/propos/findAll", proposController.findAll);

router.post("/prestation/create", prestationController.createPrestation);
router.get("/prestation/findAll", prestationController.findAll);
router.put("/prestation/update", prestationController.updatePrix);

router.post("/promotion/create", promotionController.createPromotion);
router.get("/promotion/findAll", promotionController.findAll);

router.post("/tache", tache.create);
router.post("/tache/addDetailsRep", tache.addReparation);
router.post("/tache/addPieceRep", tache.addPiece);
router.get("/tache", tache.findAll);
router.get("/tache/findByDate", tache.findByDates);
router.get("/tache/findByMec", tache.findByMecanicien);
router.put("/tache/update", tache.update);
router.post("/tache/delete", tache.delete_tache);
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API déployée sur Vercel ! 🚀');
});
app.use(router);

module.exports = app;
