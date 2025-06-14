import { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';

interface NoteFormProps {
  initialData?: { title: string; content: string; categoryIds?: number[] };
  onSubmit: (note: { title: string; content: string; categoryIds: number[] }) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const NoteForm = ({
  initialData = { title: '', content: '', categoryIds: [] },
  onSubmit,
  onCancel,
  isLoading = false,
}: NoteFormProps) => {
  const { categories } = useNotes();
  const [note, setNote] = useState({
    title: initialData.title,
    content: initialData.content,
    categoryIds: initialData.categoryIds ?? [],
  });

  useEffect(() => {
    setNote({
      title: initialData.title,
      content: initialData.content,
      categoryIds: initialData.categoryIds ?? [],
    });
  }, [initialData.title, initialData.content, JSON.stringify(initialData.categoryIds)]);


  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));
    setNote((prev) => ({ ...prev, categoryIds: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(note);
    setNote({ title: '', content: '', categoryIds: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
          Categories
        </label>
        <select
          id="categories"
          multiple
          value={note.categoryIds.map(String)}
          onChange={handleChangeCategory}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-400">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</span>
      </div>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Note'}
        </button>
      </div>
    </form>
  );
};