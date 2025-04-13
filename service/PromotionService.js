const Promotion = require("../model/Promotion");

class PromotionService{
    async create(data){
        try {
            const promotion = new Promotion({
                intitule: data.intitule,
                debut: data.debut,
                fin:data.fin,
                idPrestation: data.idPrestation,
                pourcentage: data.pourcentage,
                statut: 1
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
    async countPromotion() {
      try {
        return await Promotion.countDocuments();
      } catch (error) {
        throw error;
      }
    }

    async validate(id) {
      try {
        const promotionValided = await Promotion.findByIdAndUpdate(
          id,
          { statut: 5 },
          { new: true } 
        );
    
        if (!promotionValided) {
          throw new Error("Promotion non trouvée.");
        }
    
        return promotionValided;
      } catch (error) {
        throw error;
      }
    }
    async delete(id) {
      try {
        const deletePromotion = await Promotion.findByIdAndDelete(id);
        return deletePromotion;
      } catch (error) {
        throw error;
      }
    }
}
module.exports = PromotionService;

