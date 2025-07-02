// File: src/routes/index.js

import express from 'express';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';
import portfolioRoutes from './portfolioRoutes.js';
import experienceRoutes from './experienceRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/experience', experienceRoutes);

export default router;