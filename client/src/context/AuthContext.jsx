// File: src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';

// 1. Membuat Context-nya
export const AuthContext = createContext(null);

// 2. Membuat "Provider" atau penyedia data untuk papan pengumuman
export const AuthProvider = ({ children }) => {
  // State untuk menyimpan data user dan token
  const [token, setToken] = useState(null);

  // useEffect ini akan berjalan sekali saat aplikasi pertama kali dimuat
  useEffect(() => {
    // Cek apakah ada token di localStorage saat pertama kali membuka aplikasi
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fungsi untuk 'login' yang akan kita panggil dari LoginPage
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Simpan token ke localStorage
  };

  // Fungsi untuk 'logout'
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Hapus token dari localStorage
  };

  // Sediakan state dan fungsi di atas ke semua 'children' (seluruh aplikasi kita)
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};