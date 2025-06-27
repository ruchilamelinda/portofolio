// File: src/routes/index.js

import express from 'express';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js'; // <-- IMPORT RUTE PROFIL

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes); // <-- DAFTARKAN RUTE PROFIL

export default router;