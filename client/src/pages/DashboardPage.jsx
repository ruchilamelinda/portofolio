// File: src/pages/DashboardPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api'; // <-- Import kurir API cerdas kita

function DashboardPage() {
  const { logout } = useContext(AuthContext);
  
  // State untuk menyimpan data form profil
  const [profile, setProfile] = useState({
    full_name: '',
    public_email: '',
    phone_number: '',
    bio: '',
    photo_url: ''
  });
  
  const [message, setMessage] = useState(''); // State untuk pesan sukses/error

  // useEffect ini akan berjalan sekali saat halaman dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Ambil data profil dari backend menggunakan kurir kita
        const { data } = await api.get('/profile');
        if (data) {
          // Jika ada data, isi form dengan data tersebut
          setProfile(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
      }
    };

    fetchProfile();
  }, []); // Array dependensi kosong berarti hanya jalan sekali

  // Fungsi untuk menangani perubahan di setiap input form
  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // Kirim data profil yang sudah diupdate ke backend
      await api.put('/profile', profile);
      setMessage('Profil berhasil diperbarui!');
    } catch (error) {
      setMessage('Gagal memperbarui profil.');
      console.error("Gagal memperbarui profil:", error);
    }
  };

  return (
    <div>
      <h1>Dasbor Admin</h1>
      <p>Selamat datang! Di sini Anda bisa mengelola konten website Anda.</p>
      <button onClick={logout}>Logout</button>
      <hr />
      
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

export default DashboardPage;