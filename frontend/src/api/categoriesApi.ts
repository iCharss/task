import axios from 'axios';

const API_URL = 'http://localhost:3001/api/categories';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getActiveNotes = async () => {
  const response = await axios.get(`${API_URL}/active`, getAuthHeaders());
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const createCategory = async (name: string) => {
  const response = await axios.post(API_URL, { name }, getAuthHeaders());
  return response.data;
};

export const deleteCategory = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const addCategoryToNote = async (noteId: number, categoryId: number) => {
  await axios.post(`${API_URL}/${noteId}/add/${categoryId}`, {}, getAuthHeaders());
};

export const removeCategoryFromNote = async (noteId: number, categoryId: number) => {
  await axios.delete(`${API_URL}/${noteId}/remove/${categoryId}`, getAuthHeaders());
};

export const getCategoriesForNote = async (noteId: number) => {
  const response = await axios.get(`${API_URL}/note/${noteId}`, getAuthHeaders());
  return response.data;
};

export const getNotesByCategory = async (categoryId: number, archived: boolean = false) => {
  const response = await axios.get(`${API_URL}/${categoryId}/notes`, {
    params: { archived },
    ...getAuthHeaders()
  });
  return response.data;
};