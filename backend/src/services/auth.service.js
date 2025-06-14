const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

class AuthService {
  async register(username, password) {
    const user = await User.create({ username, password });
    return user;
  }

  async login(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) return null;

    const isValid = await user.validPassword(password);
    if (!isValid) return null;

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
  }

  async getUser(id) {
    return await User.findByPk(id);
  }
}

module.exports = new AuthService();