const Propos = require("../model/Propos");

class ProposService{
    async create(data){
        try {
            const propos = new Propos(data);
            return await propos.save();
          } catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
          const propos = await Propos.find();
          return propos;
        } catch (error) {
          throw error;
        }
    }
}
module.exports = ProposService;

