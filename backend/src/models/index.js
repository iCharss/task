const sequelize = require('../config/database');
const Note = require('./note.model');
const Category = require('./category.model');
const NoteCategory = require('./noteCategory.model');
const User = require('./user.model');

Note.associate = (models) => {
  Note.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Note.belongsToMany(models.Category, {
    through: models.NoteCategory,
    foreignKey: 'noteId',
    as: 'categories'
  });
};

Note.associate({ Category, NoteCategory, User });
Category.associate = (models) => {
  Category.belongsToMany(models.Note, {
    through: models.NoteCategory,
    foreignKey: 'categoryId',
    as: 'notes'
  });
};
if (typeof Category.associate === 'function') {
  Category.associate({ Note, NoteCategory }); 
}


module.exports = {
  sequelize,
  Note,
  Category,
  NoteCategory,
  User
};