import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Buat connection pool. Pool lebih efisien daripada membuat koneksi baru setiap saat.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ekspor pool agar bisa digunakan di file lain (models)
export default pool;