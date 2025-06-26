import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Rute untuk registrasi user baru
// Alamatnya akan menjadi /auth/register
router.post('/register', register);

// Rute untuk login user
// Alamatnya akan menjadi /auth/login
router.post('/login', login);

export default router;