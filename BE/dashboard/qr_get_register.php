<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir métodos HTTP GET, POST, y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Captura de parámetros
    $idregistro = isset($_GET['idregistro']) ? $_GET['idregistro'] : null;

    $query = "SELECT idregistro, idworkshop FROM registro WHERE idregistro = ?;";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $idregistro);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = array(
                "idregistro" => $row["idregistro"],
                "idworkshop" => $row["idworkshop"]
            );
        }
        echo json_encode(array("success" => true, "data" => $data));
    } else {
        echo json_encode(array("success" => false, "error" => "No se encontraron registros para el ID proporcionado."));
    }
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "error" => "Solicitud no válida."));
}
$conn->close();
?>
