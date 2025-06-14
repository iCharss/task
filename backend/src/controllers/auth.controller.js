const authService = require('../services/auth.service');

const authController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await authService.register(username, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      
      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = authController;