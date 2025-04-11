module.exports = (req, res, next) => {
    const { intitule} = req.body;
  
    if (!intitule || intitule.trim() === '') {
      return res.status(400).json({ error: "L'intitulé est requis." });
    }
    
    next();
  };
  