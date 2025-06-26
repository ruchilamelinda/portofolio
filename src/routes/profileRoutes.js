// File: src/routes/profileRoutes.js

import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Terapkan middleware 'protect' pada rute-rute ini
// 'protect' akan dijalankan SEBELUM 'getProfile' atau 'updateProfile'
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);

export default router;