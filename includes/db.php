<?php
/**
 * Database Connection Configuration (Hostinger Optimized)
 * Created for Faakhir Memon's Cyber Portfolio
 */
define('DB_HOST', 'localhost');
define('DB_USER', 'FM_Portfolio');
define('DB_PASS', ''); // TODO: Enter your Hostinger Database Password here before uploading!
define('DB_NAME', 'FM_Portfolio');

$pdo = null;

try {
    // 1. Establish connection directly to the Database (Hostinger standard)
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // 2. Automatically create contact_submissions table if it does not exist
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
