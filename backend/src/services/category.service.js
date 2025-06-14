const categoryRepository = require('../repositories/category.repository');
const noteRepository = require('../repositories/note.repository');

class CategoryService {
  async getAllCategories() {
    return await categoryRepository.findAll();
  }

  async createCategory(name) {
    if (!name) {
      throw new Error('Category name is required');
    }
    return await categoryRepository.create(name);
  }

  async deleteCategory(id) {
    return await categoryRepository.delete(id);
  }

  async addCategoryToNote(noteId, categoryId) {
    const note = await noteRepository.findById(noteId);
    if (!note) throw new Error('Note not found');

    return await categoryRepository.addCategoryToNote(noteId, categoryId);
  }

  async removeCategoryFromNote(noteId, categoryId) {
    const result = await categoryRepository.removeCategoryFromNote(noteId, categoryId);
    if (!result) throw new Error('Category not found in note');
    return true;
  }

  async getCategoriesForNote(noteId) {
    return await categoryRepository.getCategoriesForNote(noteId);
  }

  async getNotesByCategory(categoryId, archived = false) {
    return await categoryRepository.getNotesByCategory(categoryId, archived);
  }
}

module.exports = new CategoryService();