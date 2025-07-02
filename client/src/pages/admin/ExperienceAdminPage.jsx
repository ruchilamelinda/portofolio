// File: src/pages/admin/ExperienceAdminPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({ job_title: '', company_name: '', start_date: '', end_date: '', description: '' });
  const [isEditing, setIsEditing] = useState(null);
  const [message, setMessage] = useState('');

  const fetchExperiences = async () => {
    try {
      const { data } = await api.get('/experience');
      setExperiences(data);
    } catch (error) {
      console.error("Gagal mengambil data pengalaman:", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const dataToSubmit = {
        ...formData,
        end_date: formData.end_date || null // Kirim null jika end_date kosong
    };

    try {
      if (isEditing) {
        await api.put(`/experience/${isEditing}`, dataToSubmit);
        setMessage('Pengalaman berhasil diperbarui!');
      } else {
        await api.post('/experience', dataToSubmit);
        setMessage('Pengalaman baru berhasil ditambahkan!');
      }
      resetForm();
      fetchExperiences();
    } catch (error) {
      setMessage('Terjadi kesalahan.');
      console.error('Error saat menyimpan pengalaman:', error);
    }
  };

  const handleEdit = (exp) => {
    setIsEditing(exp.id);
    // Format tanggal untuk input type="date" (YYYY-MM-DD)
    const formattedExp = {
        ...exp,
        start_date: exp.start_date ? new Date(exp.start_date).toISOString().split('T')[0] : '',
        end_date: exp.end_date ? new Date(exp.end_date).toISOString().split('T')[0] : '',
    };
    setFormData(formattedExp);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Anda yakin ingin menghapus pengalaman ini?')) {
      try {
        await api.delete(`/experience/${id}`);
        setMessage('Pengalaman berhasil dihapus.');
        fetchExperiences();
      } catch (error) {
        setMessage('Gagal menghapus pengalaman.');
      }
    }
  };

  const resetForm = () => {
    setFormData({ job_title: '', company_name: '', start_date: '', end_date: '', description: '' });
    setIsEditing(null);
  };

  return (
    <div>
      <h2>Kelola Pengalaman Kerja</h2>
      <form onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}</h3>
        <input name="job_title" value={formData.job_title} onChange={handleInputChange} placeholder="Posisi" required />
        <input name="company_name" value={formData.company_name} onChange={handleInputChange} placeholder="Nama Perusahaan" required />
        <div><label>Tanggal Mulai: <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} required /></label></div>
        <div><label>Tanggal Selesai: <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} /></label></div>
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Deskripsi Pekerjaan"></textarea>
        <button type="submit">{isEditing ? 'Update' : 'Simpan'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Batal Edit</button>}
      </form>
      {message && <p>{message}</p>}
      <hr />
      <h3>Daftar Pengalaman</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Posisi</th>
            <th>Perusahaan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.job_title}</td>
              <td>{exp.company_name}</td>
              <td>
                <button onClick={() => handleEdit(exp)}>Edit</button>
                <button onClick={() => handleDelete(exp.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExperienceAdminPage;