const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'Invalid user' });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};