// File: src/routes/experienceRoutes.js
import express from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rute PUBLIK untuk mengambil data
router.get('/', getExperiences);

// Rute PRIVAT untuk memanipulasi data
router.post('/', protect, createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

export default router;