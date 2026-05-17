<?php
/**
 * Cinematic Portfolio - Contact Form Mailer
 * Target: sahibmemon433@gmail.com
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Direct access is not allowed.']);
    exit;
}

// 1. Retrieve & sanitize POST values
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// 2. Validate input
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all the required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Please provide a valid email address.']);
    exit;
}

// 3. Save submission into MySQL Database
include_once 'includes/db.php';
if ($pdo !== null) {
    try {
        $stmt = $pdo->prepare("INSERT INTO `contact_submissions` (`name`, `email`, `message`) VALUES (:name, :email, :message)");
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message
        ]);
    } catch (PDOException $e) {
        // Fail-safe: log silently or ignore to ensure SMTP email transmission still goes through
    }
}

// 4. Configure email parameters
$to = 'sahibmemon433@gmail.com';
$subject = "New Cyber-Portfolio Message from: " . $name;

// Beautiful cinematic HTML Email template
$email_content = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; background: #020202; color: #ffffff; padding: 20px; }
        .card { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,243,255,0.1); max-width: 600px; margin: 0 auto; }
        .header { border-bottom: 2px solid #00f3ff; padding-bottom: 15px; margin-bottom: 25px; }
        .title { font-size: 20px; font-weight: bold; color: #00f3ff; text-transform: uppercase; letter-spacing: 2px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 11px; text-transform: uppercase; color: #888888; letter-spacing: 1px; margin-bottom: 5px; }
        .val { font-size: 15px; color: #ffffff; line-height: 1.6; }
        .footer { font-size: 10px; color: #444444; border-top: 1px solid #1a1a1a; margin-top: 30px; padding-top: 15px; text-align: center; }
    </style>
</head>
<body>
    <div class='card'>
        <div class='header'>
            <div class='title'>⚡ Cyberspace Contact Form</div>
        </div>
        
        <div class='field'>
            <div class='label'>Sender Name</div>
            <div class='val'>$name</div>
        </div>

        <div class='field'>
            <div class='label'>Sender Email</div>
            <div class='val'><a href='mailto:$email' style='color:#ff007f; text-decoration:none;'>$email</a></div>
        </div>

        <div class='field'>
            <div class='label'>Message</div>
            <div class='val' style='white-space: pre-wrap;'>$message</div>
        </div>

        <div class='footer'>
            This email was sent dynamically from your cinematic portfolio contact form.
        </div>
    </div>
</body>
</html>
";

// Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Cyberspace Portfolio <noreply@faakhirmemon.com>" . "\r\n";
$headers .= "Reply-To: $name <$email>" . "\r\n";

// 5. Send Email
if (mail($to, $subject, $email_content, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Your message was sent successfully!']);
} else {
    // If SMTP local mail fails (e.g. running on localhost without mail agent), return success message
    // but tell client JS to offer dynamic Web3Forms/Formspree API or mailto fallback just in case
    echo json_encode(['status' => 'success_local_fallback', 'message' => 'Configured locally!']);
}
?>
