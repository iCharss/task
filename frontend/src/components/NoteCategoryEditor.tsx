import { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';
import type { Note } from '../types/note';

interface NoteCategoryEditorProps {
  note: Note;
  onClose: () => void;
}

export const NoteCategoryEditor = ({ note, onClose }: NoteCategoryEditorProps) => {
  const { categories, addCategoryToNote, removeCategoryFromNote } = useNotes();
  const [noteCategories, setNoteCategories] = useState<number[]>([]);

  useEffect(() => {
    if (note.categories) {
      setNoteCategories(note.categories.map(c => c.id));
    }
  }, [note]);

  const toggleCategory = async (categoryId: number) => {
    if (noteCategories.includes(categoryId)) {
      await removeCategoryFromNote(note.id, categoryId);
      setNoteCategories(prev => prev.filter(id => id !== categoryId));
    } else {
      await addCategoryToNote(note.id, categoryId);
      setNoteCategories(prev => [...prev, categoryId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Categories for: {note.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`cat-${category.id}`}
                checked={noteCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="mr-2"
              />
              <label htmlFor={`cat-${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};