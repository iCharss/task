const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NoteCategory = sequelize.define('NoteCategory', {
  noteId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  timestamps: false
});

module.exports = NoteCategory;