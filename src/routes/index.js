// File: src/routes/index.js

import express from 'express';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';

const router = express.Router();

// Arahkan semua request di /auth ke authRoutes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

// Nanti kita akan tambahkan rute lain di sini
// router.use('/profile', profileRoutes); 

export default router; // <-- BARIS INI YANG MEMPERBAIKI ERROR