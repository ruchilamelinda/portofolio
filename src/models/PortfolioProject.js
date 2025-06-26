import pool from '../config/db.js';

const PortfolioProjectModel = {
  async create({ title, description, image_url, project_url, technologies }) {
    // Kolom 'technologies' adalah tipe JSON, jadi kita perlu mengubah array/object menjadi string.
    const technologiesJson = JSON.stringify(technologies);
    const sql = 'INSERT INTO portfolio_projects (title, description, image_url, project_url, technologies) VALUES (?, ?, ?, ?, ?)';
    try {
      const [result] = await pool.query(sql, [title, description, image_url, project_url, technologiesJson]);
      return { id: result.insertId, title, description, image_url, project_url, technologies };
    } catch (error) {
      console.error('Error saat membuat proyek portofolio:', error);
      throw error;
    }
  },

  async findAll() {
    const sql = 'SELECT * FROM portfolio_projects ORDER BY created_at DESC';
    try {
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error('Error saat mengambil semua proyek portofolio:', error);
      throw error;
    }
  },

  async findById(id) {
    const sql = 'SELECT * FROM portfolio_projects WHERE id = ?';
    try {
      const [rows] = await pool.query(sql, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error(`Error saat mencari proyek portofolio dengan id ${id}:`, error);
      throw error;
    }
  },

  async update(id, { title, description, image_url, project_url, technologies }) {
    const technologiesJson = JSON.stringify(technologies);
    const sql = 'UPDATE portfolio_projects SET title = ?, description = ?, image_url = ?, project_url = ?, technologies = ? WHERE id = ?';
    try {
      const [result] = await pool.query(sql, [title, description, image_url, project_url, technologiesJson, id]);
      return result;
    } catch (error) {
      console.error(`Error saat memperbarui proyek portofolio dengan id ${id}:`, error);
      throw error;
    }
  },

  async remove(id) {
    const sql = 'DELETE FROM portfolio_projects WHERE id = ?';
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      console.error(`Error saat menghapus proyek portofolio dengan id ${id}:`, error);
      throw error;
    }
  }
};

export default PortfolioProjectModel;