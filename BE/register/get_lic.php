<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $idfacultad = $_GET['idfacultad'];

    $query = "SELECT idlic, namelic FROM licenciaturas WHERE idfacultad = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $idfacultad);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $licenciaturas = array();
    
    while ($row = $result->fetch_assoc()) {
        $licenciaturas[] = array(
            "idlic" => $row["idlic"],
            "nombre" => $row["namelic"]
        );
    }
    
    if (count($licenciaturas) > 0) {
        echo json_encode(array("success" => true, "licenciaturas" => $licenciaturas));
    } else {
        echo json_encode(array("success" => false, "error" => "No se encontraron licenciaturas."));
    }
    
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "error" => "Solicitud no válida."));
}

$conn->close();
?>
