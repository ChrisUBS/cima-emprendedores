<?php
//get_table_users
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir métodos HTTP GET, POST, y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Permitir los encabezados Content-Type y Authorization en las solicitudes CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    // Verificar la conexión a la base de datos
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $query = "SELECT r.idregistro, r.iduabc, r.name, r.lastname, r.middlename, r.type, t.nameworkshop, c.campus, r.date, r.assist 
                FROM registro r
                LEFT JOIN campus c ON r.idcampus = c.idcampus
                LEFT JOIN talleres t ON r.idworkshop = t.idworkshop;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = array(
                "idregistro" => $row["idregistro"],
                "iduabc" => $row["iduabc"],
                "name" => $row["name"],
                "lastname" => $row["lastname"],
                "middlename" => $row["middlename"],
                "type" => $row["type"],
                "nameworkshop" => $row["nameworkshop"],
                "campus" => $row["campus"],
                "date" => $row["date"],
                "assist" => $row["assist"],
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