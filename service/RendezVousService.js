const Rendez_vous = require("../model/Rendez_vous");
const RendezVous = require("../model/Rendez_vous");

class RendezVousService {
  async create(data) {
    try {
      const rendezVous = new RendezVous({
        idPrestation: data.idPrestation,
        idVoiture: data.idVoiture,
        date_rendez_vous: data.date,
        validation_rendez_vous: 0
      });
      return await rendezVous.save();
    } catch (error) {
      throw error;
    }
  }
  async findAll() {
    try {
      const rendezVous = await RendezVous.find();
      return rendezVous;
    } catch (error) {
      throw error;
    }
  }
  async findAllRdvValidate() {
    try {
      const rendezVous = await RendezVous.find({ validation_rendez_vous: 5 });
      return rendezVous;
    } catch (error) {
      throw error;
    }
  }
  async findAllRdvInvalidate() {
    try {
      const rendezVous = await RendezVous.find({ validation_rendez_vous: 0 });
      return rendezVous;
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    try {
      const nouveauRendezVous = await Rendez_vous.findByIdAndUpdate(
        data._id,
        { date_rendez_vous: data.date },
        { new: true }
      );
      if (!nouveauRendezVous) {
        throw new Error("RendezVous non trouvé.");
      }
      return nouveauRendezVous;
    } catch (error) {
      throw error;
    }
  }

  async validate(data) {
    try {
      const validation = await Rendez_vous.findByIdAndUpdate(
        data._id,
        { validation_rendez_vous: 5},
        { new: true }
      );
      if (!validation) {
        throw new Error("RendezVous non trouvé.");
      }
      return validation;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = RendezVousService;
