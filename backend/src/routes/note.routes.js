const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

router.get('/active', noteController.getAllActiveNotes);
router.get('/archived', noteController.getAllArchivedNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.patch('/:id/archive', noteController.archiveNote);
router.patch('/:id/unarchive', noteController.unarchiveNote);

module.exports = router;