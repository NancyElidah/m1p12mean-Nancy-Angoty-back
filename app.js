const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongo = require("./config/dbMongo");
const UtilisateurController = require("./controller/UtilisateurController");
const PieceController = require("./controller/PieceController");

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

router.post("/user/create", userController.create_user);
router.get("/user/findAll", userController.findAll);
router.post("/user/login", userController.login);
router.put("/user/validation", userController.valid);

router.post("/piece/create", piece.create_piece);
router.get("/piece/", piece.findAll);
router.put("/piece/update", piece.update);
router.post("/piece/delete", piece.delete);

app.use(router);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
