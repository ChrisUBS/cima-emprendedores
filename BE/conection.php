<?php
$servername = "localhost";
$username = "root";
$password = "13542";//Cambiar si tienes password en tu base de datos.
$dbname = "cimarrones_emprendedores";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
