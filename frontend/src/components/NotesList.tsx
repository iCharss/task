import type { Note } from '../types/note';
import { NoteCard } from './NoteCard';

interface NotesListProps {
  notes: Note[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
  onEditCategories: (id: number) => void;
  isArchivedList?: boolean;
}

export const NotesList = ({
  notes,
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
  onEditCategories,
  isArchivedList = false,
}: NotesListProps) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {isArchivedList ? 'No archived notes' : 'No active notes'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
          onEditCategories={onEditCategories}
          isArchived={isArchivedList}
        />
      ))}
    </div>
  );
};