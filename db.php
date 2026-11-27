
<?php
$conn = new mysqli("localhost", "root", "", "petkart");

if ($conn->connect_error) {
    die("Database Connection Failed");
}

session_start();
?>
