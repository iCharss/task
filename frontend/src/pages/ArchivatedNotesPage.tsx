import { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { NotesList } from '../components/NotesList';
import { CategoryFilter } from '../components/CategoryFilter';
import { NoteCategoryEditor } from '../components/NoteCategoryEditor';

export const ArchivedNotesPage = () => {
  const { archivedNotes, unarchiveNote, deleteNote, selectedCategory, getNotesByCategory } = useNotes();
  const [editingCategoriesNoteId, setEditingCategoriesNoteId] = useState<number | null>(null);

  const filteredNotes = selectedCategory
    ? getNotesByCategory(selectedCategory, true)
    : archivedNotes;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Archived Notes</h1>
      <CategoryFilter />
      <NotesList
        notes={filteredNotes}
        onEdit={() => {}}
        onDelete={deleteNote}
        onArchive={() => {}}
        onUnarchive={unarchiveNote}
        onEditCategories={setEditingCategoriesNoteId}
        isArchivedList={true}
      />
      {editingCategoriesNoteId && (
        <NoteCategoryEditor
          note={archivedNotes.find(n => n.id === editingCategoriesNoteId)!}
          onClose={() => setEditingCategoriesNoteId(null)}
        />
      )}
    </div>
  );
};