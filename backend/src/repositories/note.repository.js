const { Note, Category } = require('../models');

class NoteRepository {
  async findAll(archived = false, userId) {
    return await Note.findAll({
      where: { archived, userId },
      order: [['updatedAt', 'DESC']],
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }]
    });
  }

  async findById(id) {
    return await Note.findByPk(id, {
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }]
    });
  }

  async create(noteData) {
    const note = await Note.create(noteData);
    return await Note.findByPk(note.id, {
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }]
    });
  }

  async update(id, noteData) {
    let note = await Note.findByPk(id);
    if (!note) return null;
    await note.update(noteData);
    note = await Note.findByPk(id);
    return note;
  }

  async delete(id) {
    const note = await Note.findByPk(id);
    if (!note) return null;
    
    await note.destroy();
    return true;
  }

  async archive(id) {
    const note = await Note.findByPk(id);
    if (!note) return null;
    
    return await note.update({ archived: true });
  }

  async unarchive(id) {
    const note = await Note.findByPk(id);
    if (!note) return null;
    
    return await note.update({ archived: false });
  }
}

module.exports = new NoteRepository();