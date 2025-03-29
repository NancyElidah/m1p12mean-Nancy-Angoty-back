const Prestation = require("../model/Prestation");

class PrestationService{
    async create(data){
        try {
            const prestation = new Prestation({
                intitule: data.intitule,
                idPropos: data.idPropos,
                prix: data.prix
            });
            return await prestation.save();
          } catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
          const prestation = await Prestation.find();
          return prestation;
        } catch (error) {
          throw error;
        }
    }
    async update(data) {
        try {
          if (!data.prix) {
            throw new Error("Le prix est requis pour la mise à jour.");
          }
          const nouvellePrestation = await Prestation.findByIdAndUpdate(data.id,
            { prix: data.prix }, 
            { new: true } 
          );
          if (!nouvellePrestation) {
            throw new Error("Prestation non trouvée");
          }
          return nouvellePrestation;
        } catch (error) {
          throw error;
        }
    }
}
module.exports = PrestationService;

