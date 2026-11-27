
<?php

require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (
        $name === '' ||
        !filter_var($email, FILTER_VALIDATE_EMAIL) ||
        $message === ''
    ) {
        header("Location: contact.html?status=error");
        exit;
    }

    $stmt = $conn->prepare(
        "INSERT INTO contacts
        (name, email, subject, message)
        VALUES (?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "ssss",
        $name,
        $email,
        $subject,
        $message
    );

    if ($stmt->execute()) {
        header("Location: contact.html?status=success");
    } else {
        header("Location: contact.html?status=error");
    }

    $stmt->close();
    $conn->close();
    exit;
}

header("Location: contact.html");
exit;

?>
