import pool from '../config/db.js';

const ExperienceModel = {
  async create({ job_title, company_name, start_date, end_date, description }) {
    const sql = 'INSERT INTO experiences (job_title, company_name, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)';
    try {
      const [result] = await pool.query(sql, [job_title, company_name, start_date, end_date, description]);
      return { id: result.insertId, job_title, company_name, start_date, end_date, description };
    } catch (error) {
      console.error('Error saat membuat pengalaman:', error);
      throw error;
    }
  },

  async findAll() {
    const sql = 'SELECT * FROM experiences ORDER BY start_date DESC';
    try {
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error('Error saat mengambil semua pengalaman:', error);
      throw error;
    }
  },

  async findById(id) {
    const sql = 'SELECT * FROM experiences WHERE id = ?';
    try {
      const [rows] = await pool.query(sql, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error(`Error saat mencari pengalaman dengan id ${id}:`, error);
      throw error;
    }
  },

  async update(id, { job_title, company_name, start_date, end_date, description }) {
    const sql = 'UPDATE experiences SET job_title = ?, company_name = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?';
    try {
      const [result] = await pool.query(sql, [job_title, company_name, start_date, end_date, description, id]);
      return result;
    } catch (error) {
      console.error(`Error saat memperbarui pengalaman dengan id ${id}:`, error);
      throw error;
    }
  },

  async remove(id) {
    const sql = 'DELETE FROM experiences WHERE id = ?';
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      console.error(`Error saat menghapus pengalaman dengan id ${id}:`, error);
      throw error;
    }
  }
};

export default ExperienceModel;