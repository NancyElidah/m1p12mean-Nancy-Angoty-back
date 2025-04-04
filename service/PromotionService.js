const Promotion = require("../model/Promotion");

class PromotionService{
    async create(data){
        try {
            const promotion = new Promotion({
                intitule: data.intitule,
                debut: data.debut,
                fin:data.fin,
                idPrestation: data.idPrestation,
                pourcentage: data.pourcentage
            });
            return await promotion.save();
          } catch (error) {
            throw error;
        }
    }

    async findAll(skip, limit) {
      try {
        return await Promotion.find().skip(skip).limit(limit).populate('idPrestation', 'idPrestation intitule');
      } catch (error) {
        throw error;
      }
    }
}
module.exports = PromotionService;

