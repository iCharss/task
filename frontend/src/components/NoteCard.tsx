import type { Note } from '../types/note';
import { PencilIcon, TrashIcon, ArchiveBoxIcon, ArrowUturnLeftIcon, TagIcon } from '@heroicons/react/24/outline';

interface NoteCardProps {
  note: Note;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
  onEditCategories: (id: number) => void;
  isArchived: boolean;
}

export const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
  isArchived,
  onEditCategories,
}: NoteCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{note.content}</p>
      <div className="mb-3">
        {note.categories?.map(category => (
          <span 
            key={category.id} 
            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 mb-1"
          >
            {category.name}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEditCategories(note.id)}
            className="p-1 text-purple-500 hover:text-purple-700"
            title="Edit Categories">
            <TagIcon className="h-5 w-5" />
          </button>
          {!note.archived && (
            <button
              onClick={() => onEdit(note.id)}
              className="p-1 text-blue-500 hover:text-blue-700"
              title="Edit"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => onDelete(note.id)}
            className="p-1 text-red-500 hover:text-red-700"
            title="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          {isArchived ? (
            <button
              onClick={() => onUnarchive(note.id)}
              className="p-1 text-green-500 hover:text-green-700"
              title="Unarchive"
            >
              <ArrowUturnLeftIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => onArchive(note.id)}
              className="p-1 text-yellow-500 hover:text-yellow-700"
              title="Archive"
            >
              <ArchiveBoxIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};