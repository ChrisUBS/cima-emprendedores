<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if ($conn->connect_error) {
        echo json_encode(array("success" => false, "error" => "Error de conexión a la base de datos: " . $conn->connect_error));
        exit();
    }
    
    $query = "SELECT idlecturer, name, lastname FROM conferencistas";
    $result = $conn->query($query);
    
    $conferencistas = array();

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $conferencistas[] = array(
                "idlecturer" => $row["idlecturer"],
                "name" => $row["name"],
                "lastname" => $row["lastname"],
            );
        }

        $result->free();
        
        if (count($conferencistas) > 0) {
            echo json_encode(array("success" => true, "lect" => $conferencistas));
        } else {
            echo json_encode(array("success" => false, "error" => "No se encontraron conferencistas."));
        }
    } else {
        echo json_encode(array("success" => false, "error" => "Error al ejecutar la consulta: " . $conn->error));
    }
    
    $conn->close();
} else {
    echo json_encode(array("success" => false, "error" => "Solicitud no válida. Solo se permiten solicitudes GET."));
}
?>
