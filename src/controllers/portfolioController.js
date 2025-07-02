// File: src/controllers/portfolioController.js
import PortfolioProjectModel from '../models/PortfolioProject.js';

// Mengambil SEMUA proyek (untuk halaman publik)
export const getProjects = async (req, res) => {
  try {
    const projects = await PortfolioProjectModel.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error saat mengambil data proyek." });
  }
};

// Membuat proyek BARU (rute terproteksi)
export const createProject = async (req, res) => {
  try {
    const newProject = await PortfolioProjectModel.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: "Gagal membuat proyek baru.", error });
  }
};

// Mengubah proyek (rute terproteksi)
export const updateProject = async (req, res) => {
  try {
    await PortfolioProjectModel.update(req.params.id, req.body);
    res.status(200).json({ message: `Proyek dengan id ${req.params.id} berhasil diupdate.` });
  } catch (error) {
    res.status(400).json({ message: "Gagal mengupdate proyek.", error });
  }
};

// Menghapus proyek (rute terproteksi)
export const deleteProject = async (req, res) => {
  try {
    await PortfolioProjectModel.remove(req.params.id);
    res.status(200).json({ message: `Proyek dengan id ${req.params.id} berhasil dihapus.` });
  } catch (error) {
    res.status(400).json({ message: "Gagal menghapus proyek.", error });
  }
};