const { Category, Note, NoteCategory } = require('../models');

class CategoryRepository {

  async findAll() {
    return await Category.findAll();
  }

  async findById(id) {
    return await Category.findByPk(id);
  }

  async create(name) {
    return await Category.create({ name });
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    
    await category.destroy();
    return true;
  }

  async addCategoryToNote(noteId, categoryId) {
    const note = await Note.findByPk(noteId);
    if (!note) throw new Error('Note not found');
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');

    // Verifica si ya existe la relación
    const exists = await NoteCategory.findOne({ where: { noteId, categoryId } });
    if (exists) return exists;

    return await NoteCategory.create({ noteId, categoryId });
  }

  async removeCategoryFromNote(noteId, categoryId) {
    const result = await NoteCategory.destroy({
      where: { noteId, categoryId }
    });
    return result > 0;
  }

  async getCategoriesForNote(noteId) {
    const note = await Note.findByPk(noteId, {
      include: [{
        model: Category,
        as: 'categories',
        through: { attributes: [] }
      }]
    });
    return note ? note.categories : [];
  }

  async getNotesByCategory(categoryId, archived = false) {
    const category = await Category.findByPk(categoryId, {
      include: [{
        model: Note,
        as: 'notes',
        where: { archived },
        through: { attributes: [] }
      }]
    });
    return category ? category.notes : [];
  }
}

module.exports = new CategoryRepository();