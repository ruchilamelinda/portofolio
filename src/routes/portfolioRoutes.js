// File: src/routes/portfolioRoutes.js
import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rute PUBLIK - Siapa saja bisa melihat semua proyek
router.get('/', getProjects);

// Rute-rute PRIVAT - Hanya admin yang sudah login yang bisa mengakses
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;