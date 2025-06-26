// File: src/controllers/profileController.js

import ProfileModel from '../models/Profile.js';

// @desc    Mengambil data profil user yang sedang login
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.get();
    // Jika profil belum ada, kirim object kosong
    res.status(200).json(profile || {});
  } catch (error) {
    res.status(500).json({ message: 'Error server saat mengambil profil' });
  }
};

// @desc    Update data profil user yang sedang login
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const profileData = req.body;
    await ProfileModel.createOrUpdate(profileData);
    res.status(200).json({ message: 'Profil berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ message: 'Error server saat memperbarui profil' });
  }
};