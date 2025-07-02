// File: src/layouts/DashboardLayout.jsx
import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const DashboardLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Arahkan ke login setelah logout
  };

  const sidebarStyles = {
    width: '250px',
    height: '100vh',
    background: '#f4f4f4',
    padding: '20px',
    position: 'fixed',
  };

  const contentStyles = {
    marginLeft: '270px', // 250px (lebar sidebar) + 20px (jarak)
    padding: '20px',
  };

  return (
    <div style={{ display: 'flex' }}>
      <aside style={sidebarStyles}>
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/profile">Kelola Profil</Link></li>
            <li><Link to="/admin/portfolio">Kelola Portofolio</Link></li>
            <li><Link to="/admin/experience">Kelola Pengalaman</Link></li>
            {/* Nanti kita tambahkan link lain di sini */}
          </ul>
        </nav>
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
      </aside>
      <main style={contentStyles}>
        <Outlet /> {/* <-- Halaman spesifik akan dirender di sini */}
      </main>
    </div>
  );
};

export default DashboardLayout;