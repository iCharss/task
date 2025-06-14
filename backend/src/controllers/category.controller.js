const categoryService = require('../services/category.service');

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
      }
      
      const newCategory = await categoryService.createCategory(name);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
      
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addCategoryToNote: async (req, res) => {
    try {
      const { noteId, categoryId } = req.params;
      await categoryService.addCategoryToNote(noteId, categoryId);
      res.json({ message: 'Category added to note successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  removeCategoryFromNote: async (req, res) => {
    try {
      const { noteId, categoryId } = req.params;
      await categoryService.removeCategoryFromNote(noteId, categoryId);
      res.json({ message: 'Category removed from note successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCategoriesForNote: async (req, res) => {
    try {
      const categories = await categoryService.getCategoriesForNote(req.params.noteId);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getNotesByCategory: async (req, res) => {
    try {
      const { archived } = req.query;
      const notes = await categoryService.getNotesByCategory(
        req.params.categoryId,
        archived === 'true'
      );
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = categoryController;