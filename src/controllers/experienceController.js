// File: src/controllers/experienceController.js
import ExperienceModel from '../models/Experience.js';

// GET semua pengalaman
export const getExperiences = async (req, res) => {
  try {
    const experiences = await ExperienceModel.findAll();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error saat mengambil data pengalaman." });
  }
};

// POST pengalaman baru (protected)
export const createExperience = async (req, res) => {
  try {
    const newExperience = await ExperienceModel.create(req.body);
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(400).json({ message: "Gagal membuat pengalaman baru.", error });
  }
};

// PUT update pengalaman (protected)
export const updateExperience = async (req, res) => {
  try {
    await ExperienceModel.update(req.params.id, req.body);
    res.status(200).json({ message: `Pengalaman dengan id ${req.params.id} berhasil diupdate.` });
  } catch (error) {
    res.status(400).json({ message: "Gagal mengupdate pengalaman.", error });
  }
};

// DELETE pengalaman (protected)
export const deleteExperience = async (req, res) => {
  try {
    await ExperienceModel.remove(req.params.id);
    res.status(200).json({ message: `Pengalaman dengan id ${req.params.id} berhasil dihapus.` });
  } catch (error) {
    res.status(400).json({ message: "Gagal menghapus pengalaman.", error });
  }
};