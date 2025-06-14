const noteRepository = require('../repositories/note.repository');
const { Category } = require('../models');

class NoteService {
  async findAll(archived = false, userId) {
    return await Note.findAll({
      where: { archived, userId }, 
      order: [['updatedAt', 'DESC']],
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }]
    });
  }

  async getAllActiveNotes(userId) {
    return await noteRepository.findAll(false, userId);
  }

  async getAllArchivedNotes(userId) {
    return await noteRepository.findAll(true, userId);
  }

  async getNoteById(id) {
    return await noteRepository.findById(id);
  }

  async createNote(noteData) {
    const { title, content, categoryIds, userId } = noteData;
    const note = await noteRepository.create({ title, content, userId });
    if (categoryIds && Array.isArray(categoryIds)) {
      await note.setCategories(categoryIds);
      await note.reload({ include: [{ model: Category, as: 'categories' }] });
    }
    return note;
  }

  async updateNote(id, noteData) {
    const { title, content, categoryIds, userId } = noteData;
    const note = await noteRepository.update(id, { title, content, userId });
    if (!note) return null;
    if (categoryIds && Array.isArray(categoryIds)) {
      await note.setCategories(categoryIds);
      await note.reload({ include: [{ model: Category, as: 'categories' }] });
    }
    return note;
  }

  async deleteNote(id) {
    return await noteRepository.delete(id);
  }

  async archiveNote(id) {
    return await noteRepository.archive(id);
  }

  async unarchiveNote(id) {
    return await noteRepository.unarchive(id);
  }
}

module.exports = new NoteService();