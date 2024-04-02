<?php
$servername = "localhost";
$username = "root";
$password = "13542";
$dbname = "cimarrones_emprendedores";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
mysqli_close($conn);
?>