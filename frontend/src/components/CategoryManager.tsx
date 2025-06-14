import { useState } from 'react';
import { useNotes } from '../context/NotesContext';

export const CategoryManager = () => {
  const { categories, addCategory, deleteCategory } = useNotes();
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    await addCategory(newCategoryName);
    setNewCategoryName('');
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Manage Categories</h2>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
          >
            <span className="mr-2">{category.name}</span>
            <button
              onClick={() => deleteCategory(category.id)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};