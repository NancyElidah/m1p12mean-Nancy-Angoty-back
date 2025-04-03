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

    async findAll(skip, limit) {
      try {
        return await Propos.find().skip(skip).limit(limit);
      } catch (error) {
        throw error;
      }
    }

    async countPropos() {
      try {
        return await Propos.countDocuments();
      } catch (error) {
        throw error;
      }
    }

    async update(data) {
      try {
        const updatedPropos = await Propos.findByIdAndUpdate(data._id, data, {
          new: true,
        });
        return updatedPropos;
      } catch (error) {
        throw error;
      }
    }
    
    async findById(id) {
      try {
        return await Propos.findById(id);
      } catch (error) {
        throw error;
      }
    }
    
    async delete(id) {
      try {
        const deletePropos = await Propos.findByIdAndDelete(id);
        return deletePropos;
      } catch (error) {
        throw error;
      }
    }
}
module.exports = ProposService;

