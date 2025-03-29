const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const User_service = require("../service/Utilisateur_service");

class Tool {
  constructor() {
    this.user_service = new User_service();
  }

  async verifyToken(req, res, next) {
    console.log("Token:" + req["x-access-token"]);
    const token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }

      req.user_id = decoded.id;
      next();
    });
  }

  async get_user_online(req) {
    try {
      console.log("Token:" + req["x-access-token"]);
      const token = req.headers["x-access-token"];
      if (!token) {
        throw new Error("No token provided.");
      }

      const decoded = jwt.verify(token, config.secret);
      const user = await this.user_service.find_user_by_id(decoded.id);
      if (!user) {
        throw new Error("No user found.");
      }

      user.mdp = undefined;
      return user;
    } catch (error) {
      throw error;
    }
  }
}

// Exporter Tool
module.exports = Tool;
