<?php
// Simple login validator for demo/testing (no DB)
// Accepts POST fields: username, password
// On success -> redirect to Principal dashboard
// On failure -> redirect back to login with error code

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../View/Login.html');
    exit;
}

$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

// Basic validation: all fields required
if ($username === '' || $password === '') {
    header('Location: ../View/Login.html?error=empty');
    exit;
}

// Check credentials (demo): admin / admin
if ($username === 'admin' && $password === 'admin') {
    // Logged in as principal (demo). Redirect to principal dashboard.
    header('Location: ../View/Principal_Dashboard.html');
    exit;
} else {
    header('Location: ../View/Login.html?error=invalid');
    exit;
}

?>
