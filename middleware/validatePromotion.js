module.exports = (req, res, next) => {
    const { intitule, debut, fin, pourcentage, idPrestation } = req.body;
    const now = new Date();
    const startDate = new Date(debut);
    const endDate = new Date(fin);
  
    if (!intitule || intitule.trim() === '') {
      return res.status(400).json({ error: "Veuillez renseigner l’intitulé de la promotion." });
    }
  
    if (!debut || isNaN(Date.parse(debut))) {
        return res.status(400).json({ error: "Veuillez indiquer une date de début valide." });
    }
    else if (startDate <= now) {
      return res.status(400).json({ error: "La date de début doit être après la date d’aujourd’hui." });
    }
  
    if (!fin || isNaN(Date.parse(fin))) {
      return res.status(400).json({ error: "Veuillez indiquer une date de fin valide." });
    }else if (endDate <= startDate) {
      return res.status(400).json({ error: "La date de fin doit être après la date de début." });
    }
  
    if (!pourcentage || isNaN(pourcentage)) {
      return res.status(400).json({ error: "Veuillez indiquer un pourcentage valide." });
    }

    if (!idPrestation || idPrestation.trim() === '') {
        return res.status(400).json({ error: "Veuillez sélectionner la prestation." });
    }
    next();
  };
  