<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir métodos HTTP GET, POST, y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Permitir los encabezados Content-Type y Authorization en las solicitudes CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluir archivo de conexión a la base de datos
include("../conection.php");

$email = $_POST['email'];
$idworkshop = $_POST['idworkshop'];

$query = "SELECT COUNT(*) AS count FROM feedbacks WHERE email = ? AND idworkshop = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $email, $idworkshop);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row['count'] > 0) {
    echo json_encode(['valid' => false, 'message' => "Ya has completado la encuesta para este taller."]);
} else {
    echo json_encode(['valid' => true]);
}

$stmt->close();
$conn->close();
?>