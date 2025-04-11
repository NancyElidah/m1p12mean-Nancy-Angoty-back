module.exports = (req, res, next) => {
    const { intitule, prix, prestationType } = req.body;
  
    if (!intitule || intitule.trim() === '') {
      return res.status(400).json({ error: "L'intitulé est requis." });
    }
  
    if (!prix || isNaN(prix)) {
      return res.status(400).json({ error: "Le prix est requis et doit être un nombre." });
    }
  
    if (!prestationType || prestationType.trim() === '') {
      return res.status(400).json({ error: "Le type de prestation est requis." });
    }
  
    next();
  };
  