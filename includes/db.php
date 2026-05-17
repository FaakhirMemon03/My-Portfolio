<?php
/**
 * Autonomous Self-Healing Database Connection Configuration
 * Created for Faakhir Memon's Cyber Portfolio
 */
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'faakhir_portfolio');

$pdo = null;

try {
    // 1. Establish connection to MySQL Server
    $pdo = new PDO("mysql:host=" . DB_HOST . ";charset=utf8", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // 2. Automatically create database if it does not exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8 COLLATE utf8_general_ci;");
    
    // 3. Select the created database
    $pdo->exec("USE `" . DB_NAME . "`;");
    
    // 4. Automatically create contact_submissions table if it does not exist
    $tableSql = "
    CREATE TABLE IF NOT EXISTS `contact_submissions` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `message` TEXT NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ";
    $pdo->exec($tableSql);
    
} catch (PDOException $e) {
    // In case MySQL is not running or credentials differ, keep $pdo = null so that mailer continues running gracefully
    $pdo = null;
}
?>
