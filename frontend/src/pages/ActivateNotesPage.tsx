import { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { NotesList } from '../components/NotesList';
import { NoteForm } from '../components/NoteForm';
import { CategoryFilter } from '../components/CategoryFilter';
import { CategoryManager } from '../components/CategoryManager';
import { NoteCategoryEditor } from '../components/NoteCategoryEditor';

export const ActiveNotesPage = () => {
  const { activeNotes, selectedCategory, getNotesByCategory ,addNote, editNote, deleteNote, archiveNote, loading } = useNotes();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingCategoriesNoteId, setEditingCategoriesNoteId] = useState<number | null>(null);

  const filteredNotes = selectedCategory
    ? getNotesByCategory(selectedCategory, false)
    : activeNotes;

  const editingNote = editingNoteId
    ? activeNotes.find((note) => note.id === editingNoteId)
    : null;

  const handleSubmit = async (note: { title: string; content: string; categoryIds: number[] }) => {
    if (editingNoteId) {
      await editNote(editingNoteId, note);
      setEditingNoteId(null);
    } else {
      await addNote(note);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Active Notes</h1>
        <button
          onClick={() => {
            setEditingNoteId(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      <CategoryManager />
      <CategoryFilter />

      {isFormOpen && (
        <div className="mb-6">
          <NoteForm
          initialData={editingNote ? {
            title: editingNote.title,
            content: editingNote.content,
            categoryIds: editingNote.categories?.map(c => c.id) ?? []
          } : undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingNoteId(null);
          }}
          isLoading={loading}
        />
        </div>
      )}

      <NotesList
        notes={filteredNotes}
        onEdit={(id) => {
          setEditingNoteId(id);
          setIsFormOpen(true);
        }}
        onDelete={deleteNote}
        onArchive={archiveNote}
        onUnarchive={() => {}}
        onEditCategories={setEditingCategoriesNoteId}
      />

      {editingCategoriesNoteId && (
        <NoteCategoryEditor
          note={activeNotes.find(n => n.id === editingCategoriesNoteId)!}
          onClose={() => setEditingCategoriesNoteId(null)}
        />
      )}
    </div>
  );
};