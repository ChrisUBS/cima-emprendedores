<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir métodos HTTP GET, POST, y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Permitir los encabezados Content-Type y Authorization en las solicitudes CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $ubicacion = $_GET['ubicacion'];

    $query = "SELECT idworkshop, nameworkshop, status, date FROM talleres WHERE idcampus = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $ubicacion);
    $stmt->execute();
    $result = $stmt->get_result();

    $talleres = array();
    while ($row = $result->fetch_assoc()) {
        $talleres[] = array(
            "idworkshop" => $row["idworkshop"],
            "nombre" => $row["nameworkshop"],
            "status" => $row["status"],
            "date" => $row["date"]
        );
    }
    if (count($talleres) > 0) {
        echo json_encode(array("success" => true, "talleres" => $talleres));
    } else {
        echo json_encode(array("success" => false, "error" => "No se encontraron talleres para el campus proporcionado."));
    }
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "error" => "Solicitud no válida."));
}

$conn->close();
?>
