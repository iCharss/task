const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.delete('/:id', categoryController.deleteCategory);
router.post('/:noteId/add/:categoryId', categoryController.addCategoryToNote);
router.delete('/:noteId/remove/:categoryId', categoryController.removeCategoryFromNote);
router.get('/note/:noteId', categoryController.getCategoriesForNote);
router.get('/:categoryId/notes', categoryController.getNotesByCategory);

module.exports = router;