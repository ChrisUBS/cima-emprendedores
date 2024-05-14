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

    // Verificar la conexión a la base de datos
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $query = "SELECT
                    talleres.idworkshop AS idworkshop,
                    talleres.nameworkshop AS nameworkshop,
                    facultades.facultad AS facultad,
                    campus.campus AS campus,
                    talleres.date AS date,
                    talleres.time AS time,
                    talleres.status AS status,
                    talleres.descriptionworkshop AS Descripcion_de_workshop
                FROM
                    talleres
                INNER JOIN
                    facultades ON talleres.idfacultad = facultades.idfacultad
                INNER JOIN
                    campus ON talleres.idcampus = campus.idcampus";
                    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = array(
                "idworkshop" => $row["idworkshop"],
                "nameworkshop" => $row["nameworkshop"],
                "facultad" => $row["facultad"],
                "campus" => $row["campus"],
                "date" => $row["date"],
                "time" => $row["time"],
                "status" => $row["status"],
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
