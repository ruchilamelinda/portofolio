// File: src/controllers/profileController.js

import ProfileModel from '../models/Profile.js';

// Mengambil data profil
export const getProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.get();
    // Jika profil belum ada, kirim object kosong
    res.status(200).json(profile || {});
  } catch (error) {
    console.error('Error di getProfile controller:', error);
    res.status(500).json({ message: 'Error server saat mengambil profil' });
  }
};

// Update data profil
export const updateProfile = async (req, res) => {
  try {
    const profileData = req.body;
    await ProfileModel.createOrUpdate(profileData);
    res.status(200).json({ message: 'Profil berhasil diperbarui' });
  } catch (error) {
    console.error('Error di updateProfile controller:', error);
    res.status(500).json({ message: 'Error server saat memperbarui profil' });
  }
};