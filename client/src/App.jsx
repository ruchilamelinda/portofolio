// File: src/App.jsx

import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';

// Halaman Publik
import LoginPage from './pages/LoginPage.jsx';

// Layout & Halaman Admin (yang diproteksi)
import DashboardLayout from './layouts/DashboardLayout.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import ProfilePage from './pages/admin/ProfilePage.jsx';
import PortfolioAdminPage from './pages/admin/PortfolioAdminPage.jsx';
import ExperienceAdminPage from './pages/admin/ExperienceAdminPage.jsx';

import './App.css';

/**
 * Komponen 'wrapper' atau "Gerbang Keamanan" untuk semua rute admin.
 * Komponen ini akan memeriksa token. Jika ada token, ia akan menampilkan
 * layout dasbor (yang kemudian akan menampilkan halaman spesifik via <Outlet/>).
 * Jika tidak ada token, ia akan melempar pengguna ke halaman login.
 */
function ProtectedRoutes() {
  const { token } = useContext(AuthContext);
  return token ? <DashboardLayout /> : <Navigate to="/login" />;
}

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      {/* Rute untuk Login */}
      <Route
        path="/login"
        element={
          // Jika sudah login (ada token), jangan tampilkan halaman login lagi.
          // Arahkan langsung ke dasbor admin.
          token ? <Navigate to="/admin/dashboard" /> : <LoginPage />
        }
      />

      {/* Grup Rute Admin yang Diproteksi 🔑 */}
      {/* Semua rute yang ada di dalam sini akan menggunakan 'ProtectedRoutes' sebagai gerbangnya */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/profile" element={<ProfilePage />} />
        <Route path="/admin/portfolio" element={<PortfolioAdminPage />} /> {/* <-- TAMBAHKAN INI */}
        <Route path="/admin/experience" element={<ExperienceAdminPage />} />
        
        {/* Di sini kita akan menambahkan rute admin lainnya nanti,
            misalnya /admin/portfolio, /admin/experience, dll. */}
      </Route>

      {/* Rute 'catch-all' atau fallback */}
      {/* Jika pengguna membuka alamat lain, arahkan ke dasbor jika sudah login,
          atau ke halaman login jika belum. */}
      <Route
        path="*"
        element={<Navigate to={token ? "/admin/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;