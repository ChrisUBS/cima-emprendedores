<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    // Verificar la conexión a la base de datos
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $idlecturer = $_GET['idlecturer'];
    $query = "SELECT
					conferencistas.idlecturer AS idlecturer,
                    conferencistas.name AS name,
                    conferencistas.lastname AS lastname,
                    conferencistas.middlename AS middlename,
                    conferencistas.info AS info
                FROM
                    conferencistas
                WHERE
                    conferencistas.idlecturer = ?";
                    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $idlecturer);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = array(
                //"idlecturer" => $row["idlecturer"]
                //nombre en js =>   nombre en bd
                "idlecturer" => $row["idlecturer"],
                "name" => $row["name"],
                "lastname" => $row["lastname"],
                "middlename" => $row["middlename"],
                "info" => $row["info"]
            );
        }
        echo json_encode(array("success" => true, "data" => $data));
    } else {
        echo json_encode(array("success" => false, "error" => "No se encontraron datos en la base de datos."));
    }
    
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "error" => "Solicitud no válida."));
}
$conn->close();
?>
