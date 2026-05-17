-- Database Schema Setup for Faakhir Memon's Cyber Portfolio
-- Host: localhost
-- Database: faakhir_portfolio

CREATE DATABASE IF NOT EXISTS `faakhir_portfolio` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `faakhir_portfolio`;

-- --------------------------------------------------------

-- Table Structure for `contact_submissions`
CREATE TABLE IF NOT EXISTS `contact_submissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
