// File: src/App.jsx

import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import './App.css';

function App() {
  // Ambil status token dari AuthContext
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          // Jika sudah ada token, jangan tampilkan halaman login,
          // tapi arahkan (navigate) ke dasbor ('/').
          token ? <Navigate to="/" /> : <LoginPage />
        }
      />
      <Route
        path="/"
        element={
          // Jika tidak ada token, jangan tampilkan dasbor,
          // tapi arahkan ke halaman login. Ini adalah Rute Terproteksi kita.
          !token ? <Navigate to="/login" /> : <DashboardPage />
        }
      />
    </Routes>
  );
}

export default App;