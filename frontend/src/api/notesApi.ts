import axios from 'axios';

const API_URL = 'http://localhost:3001/api/notes';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getActiveNotes = async () => {
  const response = await axios.get(`${API_URL}/active`, getAuthHeaders());
  return response.data;
};

export const getArchivedNotes = async () => {
  const response = await axios.get(`${API_URL}/archived`, getAuthHeaders());
  return response.data;
};

export const getNoteById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createNote = async (note: { title: string; content: string; categoryIds: number[] }) => {
  const response = await axios.post(API_URL, note, getAuthHeaders());
  return response.data;
};

export const updateNote = async (id: number, note: { title: string; content: string; categoryIds: number[] }) => {
  const response = await axios.put(`${API_URL}/${id}`, note, getAuthHeaders());
  return response.data;
};

export const deleteNote = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const archiveNote = async (id: number) => {
  const response = await axios.patch(`${API_URL}/${id}/archive`, {}, getAuthHeaders());
  return response.data;
};

export const unarchiveNote = async (id: number) => {
  const response = await axios.patch(`${API_URL}/${id}/unarchive`, {}, getAuthHeaders());
  return response.data;
};

export const getNoteWithCategories = async (id: number) => {
  const [note, categories] = await Promise.all([
    axios.get(`${API_URL}/${id}`, getAuthHeaders()),
    axios.get(`http://localhost:3001/api/categories/note/${id}`, getAuthHeaders())
  ]);
  return { ...note.data, categories: categories.data };
};