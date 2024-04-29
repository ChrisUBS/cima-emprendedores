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

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $ubicacion = $_GET['ubicacion'];

    $query = "SELECT idfacultad, facultad FROM facultades WHERE idcampus = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $ubicacion);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $facultades = array();
    
    while ($row = $result->fetch_assoc()) {
        $facultades[] = array(
            "idfacultad" => $row["idfacultad"],
            "nombre" => $row["facultad"]
        );
    }
    
    if (count($facultades) > 0) {
        echo json_encode(array("success" => true, "facultades" => $facultades));
    } else {
        echo json_encode(array("success" => false, "error" => "No se encontraron facultades."));
    }
    
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "error" => "Solicitud no válida."));
}

$conn->close();
?>
