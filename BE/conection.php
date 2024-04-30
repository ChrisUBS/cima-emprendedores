<?php
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "cimarrones_emprendedores";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
