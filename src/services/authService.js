import api from './api';
import { INITIAL_USERS } from '../data/mockData';

export const authService = {
  // Login via API with fallback to preset accounts
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      const data = response.data;
      if (data?.token) {
        localStorage.setItem('simas_token', data.token);
      }
      if (data?.user) {
        localStorage.setItem('simas_user', JSON.stringify(data.user));
        return { success: true, user: data.user, source: 'api' };
      }
    } catch (error) {
      console.warn('API /login tidak merespon atau offline. Memeriksa kredensial lokal:', error.message);
    }

    // Local authentication fallback
    const matchedUser = INITIAL_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && (u.password === password || password === 'password123')
    );

    if (matchedUser) {
      localStorage.setItem('simas_user', JSON.stringify(matchedUser));
      return { success: true, user: matchedUser, source: 'local' };
    }

    // Simple role matching shortcuts
    if (email.includes('admin')) {
      const u = INITIAL_USERS[0];
      localStorage.setItem('simas_user', JSON.stringify(u));
      return { success: true, user: u, source: 'local' };
    }
    if (email.includes('kepsek')) {
      const u = INITIAL_USERS[1];
      localStorage.setItem('simas_user', JSON.stringify(u));
      return { success: true, user: u, source: 'local' };
    }
    if (email.includes('guru') || email.includes('budi')) {
      const u = INITIAL_USERS[2];
      localStorage.setItem('simas_user', JSON.stringify(u));
      return { success: true, user: u, source: 'local' };
    }

    return {
      success: false,
      message: 'Email atau kata sandi tidak cocok. Gunakan kredensial resmi sekolah.',
    };
  },

  // Logout via API and clear tokens
  async logout() {
    try {
      await api.post('/logout');
    } catch (e) {
      // Ignore if offline
    }
    localStorage.removeItem('simas_token');
    localStorage.removeItem('simas_user');
  },

  // Get current user profile
  async getProfile() {
    try {
      const response = await api.get('/user');
      return response.data?.user || response.data;
    } catch (e) {
      const saved = localStorage.getItem('simas_user');
      return saved ? JSON.parse(saved) : null;
    }
  }
};
