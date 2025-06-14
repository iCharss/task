const Note = require('../models/note.model');
const { sequelize, User } = require('../models');

async function setupDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database established successfully.');
    
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    await User.create({
      username: 'admin',
      password: 'password'
    });
    console.log('Default user created');
    
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

setupDatabase();