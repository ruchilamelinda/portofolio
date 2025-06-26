// File: src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Cek apakah ada header 'Authorization' dan dimulai dengan 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Ambil token dari header (setelah kata 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // 3. Verifikasi token menggunakan secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Ambil data user dari database berdasarkan id di token (tanpa password)
      // dan lampirkan ke object 'req' agar bisa diakses oleh controller selanjutnya.
      req.user = await UserModel.findById(decoded.userId);
      
      // 5. Jika semua valid, lanjutkan ke fungsi controller berikutnya
      next();
    } catch (error) {
      console.error('Token gagal diverifikasi', error);
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token.' });
  }
};