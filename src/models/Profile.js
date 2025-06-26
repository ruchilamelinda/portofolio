import pool from '../config/db.js';

const ProfileModel = {
  /**
   * Mengambil data profil.
   * Karena hanya ada satu profil, kita tidak butuh ID.
   * @returns {Promise<object|null>} Data profil atau null jika belum ada.
   */
  async get() {
    try {
      const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
      return rows[0] || null;
    } catch (error) {
      console.error('Error saat mengambil profil:', error);
      throw error;
    }
  },

  /**
   * Membuat atau memperbarui data profil.
   * Menggunakan ON DUPLICATE KEY UPDATE untuk menangani kasus jika data belum ada (INSERT)
   * atau sudah ada (UPDATE) secara otomatis.
   * @param {object} profileData - Data profil.
   * @param {string} profileData.full_name
   * @param {string} profileData.public_email
   * @param {string} profileData.phone_number
   * @param {string} profileData.bio
   * @param {string} profileData.photo_url
   * @returns {Promise<object>} Hasil dari operasi database.
   */
  async createOrUpdate({ full_name, public_email, phone_number, bio, photo_url }) {
    const sql = `
      INSERT INTO profile (id, full_name, public_email, phone_number, bio, photo_url)
      VALUES (1, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        public_email = VALUES(public_email),
        phone_number = VALUES(phone_number),
        bio = VALUES(bio),
        photo_url = VALUES(photo_url)
    `;
    try {
      const [result] = await pool.query(sql, [full_name, public_email, phone_number, bio, photo_url]);
      return result;
    } catch (error) {
      console.error('Error saat menyimpan profil:', error);
      throw error;
    }
  }
};

export default ProfileModel;