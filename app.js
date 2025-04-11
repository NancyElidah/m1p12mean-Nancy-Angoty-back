const express = require("express");
const cors = require("cors");  // Importer le package cors
const app = express();
const port = process.env.PORT || 5000;
const mongo = require("./config/dbMongo");
const UtilisateurController = require("./controller/UtilisateurController");
const PieceController = require("./controller/PieceController");
const VoitureController = require("./controller/VoitureController");
const ProposController = require("./controller/ProposController");
const PrestationController = require("./controller/PrestationController");
const PromotionController = require("./controller/PromotionController");
const TacheController = require("./controller/TacheController");
const RendezVousController = require("./controller/RendezVousController");
const validatePrestation = require('./middleware/validatePrestation');
const validatePropos = require('./middleware/validatePropos');

const corsOptions = {
  origin: 'http://localhost:4200',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'x-access-token'],  // En-têtes autorisés
  preflightContinue: false,  // CORS: gérer les requêtes OPTIONS
  optionsSuccessStatus: 200  // Statut de succès pour les prérequis OPTIONS
};

// Utiliser le middleware CORS dans ton app
app.use(cors(corsOptions));  // Appliquer CORS à toutes les requêtes

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

const router = express.Router();
const userController = new UtilisateurController();
const piece = new PieceController();
const voiture = new VoitureController();
const propos = new ProposController();
const prestation = new PrestationController();
const promotion = new PromotionController();
const tache = new TacheController();
const rendezvous = new RendezVousController();

router.post("/user/create", userController.create_user);
router.get("/user/findAll", userController.findAll);
router.post("/user/login", userController.login);
router.put("/user/validation", userController.valid);

router.post("/piece/create", piece.create_piece);
router.get("/piece/", piece.findAll);
router.put("/piece/update", piece.update);
router.delete("/piece/delete", piece.delete);

router.post("/voiture/create", voiture.createVoiture);
router.get("/voiture/getByUser/:idUtilisateur", voiture.getVoituresByUtilisateur);
router.get("/voiture/findAll", voiture.findAll);

router.post("/propos/validate", validatePropos, (req, res) => {
  res.status(200).json({ success: true, message: "Données valides." });
});
  
router.post("/propos/create", propos.createPropos);
router.get("/propos/findAll", propos.findAll);
router.put("/propos/update", propos.update);
router.delete("/propos/delete/:id", propos.delete);
router.get("/propos/getAll", propos.getAll);

router.post("/prestation/validate", validatePrestation, (req, res) => {
  res.status(200).json({ success: true, message: "Données valides." });
});
  

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
router.post("/tache/addPieceRep", tache.addPiece);
router.get("/tache", tache.findAll);
router.get("/tache/findByDate", tache.findByDates);
router.get("/tache/findByMec", tache.findByMecanicien);
router.put("/tache/update", tache.update);
router.post("/tache/delete", tache.delete_tache);

app.use(router);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
