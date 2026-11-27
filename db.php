
<?php

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "lauren_db"
);

if ($conn->connect_error) {
    die("Database Connection Failed");
}

$conn->set_charset("utf8mb4");

?>
