const noteService = require('../services/note.service');
const { Note } = require('../models');

const noteController = {
  getAllActiveNotes: async (req, res) => {
    try {
      const notes = await noteService.getAllActiveNotes(req.user.id);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllArchivedNotes: async (req, res) => {
    try {
      const notes = await noteService.getAllArchivedNotes(req.user.id);
      console.log('ARCHIVED NOTES:', JSON.stringify(notes, null, 2)); // <-- agrega esto
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getNoteById: async (req, res) => {
    try {
      const note = await noteService.getNoteById(req.params.id, req.user.id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createNote: async (req, res) => {
    try {
      const { title, content, categoryIds } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
      
      const userId = req.user.id;
      const newNote = await noteService.createNote({ title, content, categoryIds, userId });
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateNote: async (req, res) => {
    try {
      const note = await Note.findByPk(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      if (note.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

      const updated = await note.update(req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteNote: async (req, res) => {
    try {
      const note = await Note.findByPk(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      if (note.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

      await note.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  archiveNote: async (req, res) => {
    try {
      const note = await Note.findByPk(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      if (note.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

      note.archived = true;
      await note.save();
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  unarchiveNote: async (req, res) => {
    try {
      const note = await Note.findByPk(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      if (note.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

      note.archived = false;
      await note.save();
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = noteController;