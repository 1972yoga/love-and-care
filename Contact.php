
<?php
require_once 'db.php';

$success = "";
$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    if ($name && $email && $subject && $message) {

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

            $sql = "INSERT INTO contact_messages
                    (name, email, subject, message)
                    VALUES (:name, :email, :subject, :message)";

            $stmt = $pdo->prepare($sql);

            $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':subject' => $subject,
                ':message' => $message
            ]);

            $success = "Thank you! Your message has been sent successfully.";

        } else {
            $error = "Please enter a valid email address.";
        }

    } else {
        $error = "Please fill in all the fields.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Contact Us - Love and Care</title>

    <link rel="stylesheet" href="assets/style.css">
</head>

<body>

<header>
    <h1>Love and Care 🐾</h1>

    <nav>
        <a href="index.php">Home</a>
        <a href="pets.php">Our Pets</a>
        <a href="contact.php">Contact</a>
    </nav>
</header>

<section class="contact-section">

    <h2>Contact Us</h2>

    <p>
        We are always happy to help you!
        Contact us for any pet care information.
    </p>

    <?php if ($success): ?>
        <p style="color:green;">
            <?php echo htmlspecialchars($success); ?>
        </p>
    <?php endif; ?>

    <?php if ($error): ?>
        <p style="color:red;">
            <?php echo htmlspecialchars($error); ?>
        </p>
    <?php endif; ?>

    <form method="POST" action="contact.php">

        <label>Your Name</label>
        <input type="text" name="name"
               placeholder="Enter your name" required>

        <label>Email Address</label>
        <input type="email" name="email"
               placeholder="Enter your email" required>

        <label>Subject</label>
        <input type="text" name="subject"
               placeholder="Enter subject" required>

        <label>Your Message</label>
        <textarea name="message"
                  placeholder="Write your message"
                  rows="5" required></textarea>

        <button type="submit">Send Message</button>

    </form>

</section>

<footer>
    <p>© 2026 Love and Care. All Rights Reserved.</p>
    <p>Made with ❤️ for Pets</p>
</footer>

</body>
</html>

