// File: src/pages/admin/ProfilePage.jsx (Sebelumnya DashboardPage.jsx)
// Tidak ada perubahan kode, hanya ganti nama file dan lokasi
import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // perhatikan path ke services

function ProfilePage() { // Ganti nama fungsi menjadi ProfilePage
  // ... (semua kode state, useEffect, dan handler untuk profil tetap sama) ...
  const [profile, setProfile] = useState({ /* ... */ });
  const [message, setMessage] = useState('');
  useEffect(() => { /* ... */ }, []);
  const handleInputChange = (e) => { /* ... */ };
  const handleSubmit = async (e) => { /* ... */ };
  
  return (
    <div>
      <h2>Kelola Profil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Lengkap:</label>
          <input type="text" name="full_name" value={profile.full_name || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email Publik:</label>
          <input type="email" name="public_email" value={profile.public_email || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Nomor Telepon:</label>
          <input type="text" name="phone_number" value={profile.phone_number || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Bio Singkat:</label>
          <textarea name="bio" value={profile.bio || ''} onChange={handleInputChange}></textarea>
        </div>
        {/* Nanti kita akan buat upload foto di sini */}
        
        <button type="submit">Simpan Perubahan</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
export default ProfilePage;