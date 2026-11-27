
<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Invalid request.");
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$pet = trim($_POST["pet_type"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || $pet === "" || $message === "") {
    exit("Please enter valid details.");
}

$sql = "INSERT INTO enquiries (name, email, pet_type, message)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $pet, $message);

if ($stmt->execute()) {
    echo "Your enquiry was submitted successfully!";
} else {
    http_response_code(500);
    echo "Unable to submit your enquiry.";
}

$stmt->close();
$conn->close();

?>
