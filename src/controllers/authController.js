import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Controller untuk registrasi
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi.' });
    }

    // 2. Cek apakah user sudah ada
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }

    // 3. Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Simpan user baru ke database
    await UserModel.create({ email, passwordHash });

    // 5. Kirim respons sukses
    res.status(201).json({ message: 'User berhasil dibuat.' });

  } catch (error) {
    console.error('Error di controller register:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// Controller untuk login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi.' });
    }

    // 2. Cari user berdasarkan email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      // Untuk keamanan, jangan beri tahu bahwa emailnya tidak ada.
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // 3. Bandingkan password yang diinput dengan hash di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // 4. Jika cocok, buat JSON Web Token (JWT)
    const payload = {
      userId: user.id,
      email: user.email
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Token akan kedaluwarsa dalam 7 hari
    );

    // 5. Kirim token ke client
    res.status(200).json({
      message: 'Login berhasil.',
      token: token
    });

  } catch (error) {
    console.error('Error di controller login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};