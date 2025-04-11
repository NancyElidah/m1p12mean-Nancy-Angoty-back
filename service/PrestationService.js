const Prestation = require("../model/Prestation");

class PrestationService {
  async create(data) {
    try {
      const prestation = new Prestation({
        intitule: data.intitule,
        prestationType: data.prestationType,
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
  async findAll(skip, limit) {
    try {
      return await Prestation.find().skip(skip).limit(limit).populate('prestationType', 'idPropos intitule');
    } catch (error) {
      throw error;
    }
  }
  
  async update(data) {
    try {
      if (!data.prix) {
        throw new Error("Le prix est requis pour la mise à jour.");
      }
      const nouvellePrestation = await Prestation.findByIdAndUpdate(
        data._id,
        { prix: data.prix },
        { new: true }
      );
      if (!nouvellePrestation) {
        throw new Error("Prestation non trouvée.");
      }
      return nouvellePrestation;
    } catch (error) {
      throw error;
    }
  }
  
  async findById(id) {
    try {
      return await Prestation.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async countPrestation() {
    try {
      return await Prestation.countDocuments();
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletePrestation = await Prestation.findByIdAndDelete(id);
      return deletePrestation;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = PrestationService;
