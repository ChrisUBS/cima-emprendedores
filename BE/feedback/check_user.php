<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir métodos HTTP GET, POST, y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Permitir los encabezados Content-Type y Authorization en las solicitudes CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

$email = $_POST['email'];
$idworkshop = $_POST['idworkshop'];

$queryRegistro = "SELECT COUNT(*) AS count FROM registro WHERE email = ? AND idworkshop = ?";
$stmtRegistro = $conn->prepare($queryRegistro);
$stmtRegistro->bind_param("si", $email, $idworkshop);
$stmtRegistro->execute();
$resultRegistro = $stmtRegistro->get_result();
$rowRegistro = $resultRegistro->fetch_assoc();
$countRegistro = $rowRegistro['count'];


$queryFeedback = "SELECT COUNT(*) AS count FROM feedback WHERE email = ? AND idworkshop = ?";
$stmtFeedback = $conn->prepare($queryFeedback);
$stmtFeedback->bind_param("si", $email, $idworkshop);
$stmtFeedback->execute();
$resultFeedback = $stmtFeedback->get_result();
$rowFeedback = $resultFeedback->fetch_assoc();
$countFeedback = $rowFeedback['count'];

// Comparar de registro y feedback
if ($countRegistro > $countFeedback) {
    echo json_encode(['valid' => true]);
} else {
    echo json_encode(['valid' => false]);
}

$stmtRegistro->close();
$stmtFeedback->close();
$conn->close();
?>
