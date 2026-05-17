-- Database Schema Setup for Faakhir Memon's Cyber Portfolio (Hostinger Optimized)
-- Host: localhost
-- Database: FM_Portfolio

-- NOTE: On Hostinger, you must create the Database and User from the hPanel first.
-- After creating 'FM_Portfolio', you can run the table creation query below in phpMyAdmin.

-- --------------------------------------------------------

-- Table Structure for `contact_submissions`
CREATE TABLE IF NOT EXISTS `contact_submissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
