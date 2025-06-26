-- Skema Awal untuk Database Portofolio

-- Tabel untuk User (Admin)
-- Hanya akan ada satu baris di sini, yaitu data Anda sebagai admin.
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;

-- Tabel untuk data Profil Utama
-- Juga hanya akan ada satu baris di sini.
CREATE TABLE IF NOT EXISTS `profile` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `full_name` VARCHAR(255),
  `public_email` VARCHAR(255),
  `phone_number` VARCHAR(50),
  `bio` TEXT,
  `photo_url` VARCHAR(255),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT profile_has_only_one_row CHECK (id = 1)
) ENGINE=INNODB;

-- Tabel untuk Proyek Portofolio
CREATE TABLE IF NOT EXISTS `portfolio_projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` VARCHAR(255),
  `project_url` VARCHAR(255),
  `technologies` JSON, -- Menyimpan daftar teknologi sebagai array JSON
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;

-- Tabel untuk Pengalaman Kerja
CREATE TABLE IF NOT EXISTS `experiences` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `job_title` VARCHAR(255) NOT NULL,
  `company_name` VARCHAR(255) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE, -- Bisa NULL jika masih bekerja di sana
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;

-- Tabel untuk Sertifikat
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `issuer` VARCHAR(255) NOT NULL,
  `issue_date` DATE NOT NULL,
  `credential_url` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;