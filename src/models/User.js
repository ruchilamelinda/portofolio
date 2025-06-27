import pool from '../config/db.js';

// Model ini adalah sebuah objek dengan fungsi-fungsi untuk berinteraksi dengan tabel 'users'

const UserModel = {
  /**
   * Mencari user berdasarkan email.
   * @param {string} email - Email user yang dicari.
   * @returns {Promise<object|null>} Data user atau null jika tidak ditemukan.
   */
  async findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      // Mengembalikan user pertama yang ditemukan, atau null
      return rows[0] || null;
    } catch (error) {
      console.error('Error saat mencari user by email:', error);
      throw error; // Melempar error untuk ditangani di controller
    }
  },

  async findById(id) {
    try {
      // Kita tidak mengambil kolom password demi keamanan
      const [rows] = await pool.query('SELECT id, email, created_at FROM users WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error saat mencari user by id:', error);
      throw error;
    }
  },

  /**
   * Membuat user baru.
   * @param {object} userData - Data user yang akan dibuat.
   * @param {string} userData.email - Email user.
   * @param {string} userData.passwordHash - Password yang SUDAH di-hash.
   * @returns {Promise<object>} Hasil dari operasi insert.
   */
  async create({ email, passwordHash }) {
    try {
      const [result] = await pool.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, passwordHash]
      );
      return result;
    } catch (error) {
      console.error('Error saat membuat user:', error);
      throw error;
    }
  }
};

export default UserModel;