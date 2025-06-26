import pool from '../config/db.js';

const CertificateModel = {
  async create({ title, issuer, issue_date, credential_url }) {
    const sql = 'INSERT INTO certificates (title, issuer, issue_date, credential_url) VALUES (?, ?, ?, ?)';
    try {
      const [result] = await pool.query(sql, [title, issuer, issue_date, credential_url]);
      return { id: result.insertId, title, issuer, issue_date, credential_url };
    } catch (error) {
      console.error('Error saat membuat sertifikat:', error);
      throw error;
    }
  },

  async findAll() {
    const sql = 'SELECT * FROM certificates ORDER BY issue_date DESC';
    try {
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error('Error saat mengambil semua sertifikat:', error);
      throw error;
    }
  },

  async findById(id) {
    const sql = 'SELECT * FROM certificates WHERE id = ?';
    try {
      const [rows] = await pool.query(sql, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error(`Error saat mencari sertifikat dengan id ${id}:`, error);
      throw error;
    }
  },

  async update(id, { title, issuer, issue_date, credential_url }) {
    const sql = 'UPDATE certificates SET title = ?, issuer = ?, issue_date = ?, credential_url = ? WHERE id = ?';
    try {
      const [result] = await pool.query(sql, [title, issuer, issue_date, credential_url, id]);
      return result;
    } catch (error) {
      console.error(`Error saat memperbarui sertifikat dengan id ${id}:`, error);
      throw error;
    }
  },

  async remove(id) {
    const sql = 'DELETE FROM certificates WHERE id = ?';
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      console.error(`Error saat menghapus sertifikat dengan id ${id}:`, error);
      throw error;
    }
  }
};

export default CertificateModel;