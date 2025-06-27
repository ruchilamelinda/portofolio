// File: src/services/api.js

import axios from 'axios';

// 1. Membuat instance axios dengan konfigurasi dasar
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL dasar dari backend kita
});

// 2. Menggunakan "Interceptor" untuk memodifikasi request SEBELUM dikirim
// Ini adalah "kurir cerdas" kita.
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    
    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config; // Lanjutkan request dengan config yang sudah diubah
  },
  (error) => {
    // Jika ada error saat konfigurasi, tolak promise-nya
    return Promise.reject(error);
  }
);

export default api;