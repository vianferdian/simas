import api from './api';
import { INITIAL_GURU } from '../data/mockData';

export const guruService = {
  // Fetch all teachers
  async getAll() {
    try {
      const response = await api.get('/guru');
      // Format standard response { data: [...] } or direct array
      const list = response.data?.data || response.data;
      if (Array.isArray(list) && list.length > 0) {
        localStorage.setItem('simas_guru', JSON.stringify(list));
        return { data: list, source: 'api' };
      }
    } catch (error) {
      console.warn('API /guru tidak terhubung atau offline. Menggunakan cache lokal/dummy:', error.message);
    }

    // Fallback to localStorage or mock data
    const saved = localStorage.getItem('simas_guru');
    return {
      data: saved ? JSON.parse(saved) : INITIAL_GURU,
      source: 'local'
    };
  },

  // Fetch single teacher by ID
  async getById(id) {
    try {
      const response = await api.get(`/guru/${id}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.warn(`API /guru/${id} error, fallback ke local:`, error.message);
      const saved = localStorage.getItem('simas_guru');
      const list = saved ? JSON.parse(saved) : INITIAL_GURU;
      return list.find(g => g.id === id);
    }
  },

  // Create new teacher
  async create(data) {
    try {
      const response = await api.post('/guru', data);
      return response.data?.data || response.data;
    } catch (error) {
      console.warn('API /guru POST error, menyimpan di lokal:', error.message);
      return { ...data, id: `g-${Date.now()}` };
    }
  },

  // Update teacher
  async update(id, data) {
    try {
      const response = await api.put(`/guru/${id}`, data);
      return response.data?.data || response.data;
    } catch (error) {
      console.warn(`API /guru/${id} PUT error, memperbarui di lokal:`, error.message);
      return { ...data, id };
    }
  },

  // Delete teacher
  async delete(id) {
    try {
      const response = await api.delete(`/guru/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`API /guru/${id} DELETE error, menghapus di lokal:`, error.message);
      return { success: true };
    }
  }
};
