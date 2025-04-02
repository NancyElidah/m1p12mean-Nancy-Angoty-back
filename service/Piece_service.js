const Piece = require("../model/Piece");

class PieceService {
  async create_piece(data) {
    try {
      const piece = new Piece(data);
      return await piece.save();
    } catch (error) {
      throw error;
    }
  }
  async findAll(skip, limit) {
    try {
      return await Piece.find().skip(skip).limit(limit);
    } catch (error) {
      throw error;
    }
  }
  async countPieces() {
    try {
      return await Piece.countDocuments();
    } catch (error) {
      throw error;
    }
  }
  async update_piece(data) {
    try {
      const updatedPiece = await Piece.findByIdAndUpdate(data._id, data, {
        new: true,
      });
      return updatedPiece;
    } catch (error) {
      throw error;
    }
  }
  async delete_piece(id) {
    try {
      const deletedPiece = await Piece.findByIdAndDelete(id);
      return deletedPiece;
    } catch (error) {
      throw error;
    }
  }
  async findById(id) {
    try {
      return await Piece.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const prestation = await Piece.find();
      return prestation;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PieceService;
