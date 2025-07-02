// File: src/pages/admin/PortfolioAdminPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function PortfolioAdminPage() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', project_url: '', technologies: '' });
  const [isEditing, setIsEditing] = useState(null); // Menyimpan ID proyek yang sedang diedit
  const [message, setMessage] = useState('');

  // Fungsi untuk mengambil semua proyek
  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/portfolio');
      setProjects(data);
    } catch (error) {
      console.error("Gagal mengambil data proyek:", error);
    }
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Khusus untuk technologies, kita ubah dari string dipisah koma menjadi array
    if (name === 'technologies') {
      setFormData({ ...formData, [name]: value.split(',').map(tech => tech.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (isEditing) {
        // Jika sedang mengedit, kirim request PUT
        await api.put(`/portfolio/${isEditing}`, formData);
        setMessage('Proyek berhasil diperbarui!');
      } else {
        // Jika menambah baru, kirim request POST
        await api.post('/portfolio', formData);
        setMessage('Proyek baru berhasil ditambahkan!');
      }
      resetForm();
      fetchProjects(); // Ambil ulang data proyek untuk menampilkan data terbaru
    } catch (error) {
      setMessage('Terjadi kesalahan.');
      console.error('Error saat menyimpan proyek:', error);
    }
  };

  const handleEdit = (project) => {
    setIsEditing(project.id);
    // Saat edit, ubah kembali array technologies menjadi string dipisah koma untuk ditampilkan di form
    setFormData({ ...project, technologies: project.technologies.join(', ') });
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Anda yakin ingin menghapus proyek ini?')) {
      try {
        await api.delete(`/portfolio/${id}`);
        setMessage('Proyek berhasil dihapus.');
        fetchProjects();
      } catch (error) {
        setMessage('Gagal menghapus proyek.');
        console.error('Error saat menghapus proyek:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', project_url: '', technologies: '' });
    setIsEditing(null);
  };

  return (
    <div>
      <h2>Kelola Proyek Portofolio</h2>
      
      {/* FORM UNTUK MENAMBAH/MENGEDIT */}
      <form onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Proyek' : 'Tambah Proyek Baru'}</h3>
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Judul Proyek" required />
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Deskripsi"></textarea>
        <input name="project_url" value={formData.project_url} onChange={handleInputChange} placeholder="URL Proyek (https://...)" />
        <input name="technologies" value={formData.technologies} onChange={handleInputChange} placeholder="Teknologi (pisahkan dengan koma)" />
        <button type="submit">{isEditing ? 'Update' : 'Simpan'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Batal Edit</button>}
      </form>
      {message && <p>{message}</p>}
      <hr />

      {/* DAFTAR PROYEK YANG SUDAH ADA */}
      <h3>Daftar Proyek</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioAdminPage;