import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Category, Note } from '../types/note';
import * as notesApi from '../api/notesApi';
import * as categoriesApi from '../api/categoriesApi';

interface NotesContextType {
  activeNotes: Note[];
  archivedNotes: Note[];
  loading: boolean;
  error: string | null;
  categories: Category[];
  selectedCategory: number | null;
  addNote: (note: { title: string; content: string; categoryIds: number[] }) => Promise<void>;
  editNote: (id: number, note: { title: string; content: string; categoryIds: number[] }) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  archiveNote: (id: number) => Promise<void>;
  unarchiveNote: (id: number) => Promise<void>;
  fetchNotes: () => Promise<void>;
  setSelectedCategory: (id: number | null) => void;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  addCategoryToNote: (noteId: number, categoryId: number) => Promise<void>;
  removeCategoryFromNote: (noteId: number, categoryId: number) => Promise<void>;
  getNotesByCategory: (categoryId: number, archived?: boolean) => Note[];
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const [active, archived] = await Promise.all([
        notesApi.getActiveNotes(),
        notesApi.getArchivedNotes(),
      ]);
      setActiveNotes(active);
      setArchivedNotes(archived);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (note: { title: string; content: string; categoryIds: number[] }) => {
    try {
      const newNote = await notesApi.createNote(note);
      setActiveNotes(prev => [newNote, ...prev]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const editNote = async (id: number, note: { title: string; content: string; categoryIds: number[] }) => {
    try {
      const updatedNote = await notesApi.updateNote(id, note);
      setActiveNotes(prev => 
        prev.map(n => n.id === id ? updatedNote : n)
      );
      setArchivedNotes(prev => 
        prev.map(n => n.id === id ? updatedNote : n)
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await notesApi.deleteNote(id);
      setActiveNotes(prev => prev.filter(note => note.id !== id));
      setArchivedNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const archiveNote = async (id: number) => {
    try {
      const archivedNote = await notesApi.archiveNote(id);
      setActiveNotes(prev => prev.filter(note => note.id !== id));
      setArchivedNotes(prev => [archivedNote, ...prev]);
      await fetchNotes();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const unarchiveNote = async (id: number) => {
    try {
      const unarchivedNote = await notesApi.unarchiveNote(id);
      setArchivedNotes(prev => prev.filter(note => note.id !== id));
      setActiveNotes(prev => [unarchivedNote, ...prev]);
      await fetchNotes();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const fetchCategories = async () => {
    try {
      const categories = await categoriesApi.getCategories();
      setCategories(categories);
    } catch (err) {
      console.error(err);
    }
  };

  const addCategory = async (name: string) => {
    try {
      const newCategory = await categoriesApi.createCategory(name);
      setCategories(prev => [...prev, newCategory]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoriesApi.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const addCategoryToNote = async (noteId: number, categoryId: number) => {
    try {
      await categoriesApi.addCategoryToNote(noteId, categoryId);
      await fetchNotes(); // Refresh notes to update categories
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeCategoryFromNote = async (noteId: number, categoryId: number) => {
    try {
      await categoriesApi.removeCategoryFromNote(noteId, categoryId);
      await fetchNotes(); // Refresh notes to update categories
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getNotesByCategory = (categoryId: number, archived: boolean = false) => {
  const notes = archived ? archivedNotes : activeNotes;
  return notes.filter(note =>
    note.categories?.some(category => category.id === categoryId)
  );
};

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        activeNotes,
        archivedNotes,
        loading,
        error,
        categories,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        deleteCategory,
        addCategoryToNote,
        removeCategoryFromNote,
        addNote,
        editNote,
        deleteNote,
        archiveNote,
        unarchiveNote,
        fetchNotes,
        getNotesByCategory,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};