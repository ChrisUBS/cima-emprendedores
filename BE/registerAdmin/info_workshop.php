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
    $idworkshop = $_GET['idworkshop'];
    $query = "SELECT
                    talleres.idworkshop AS idworkshop,
                    talleres.nameworkshop AS nameworkshop,
                    facultades.facultad AS facultad,
                    campus.campus AS campus,
                    talleres.date AS date,
                    talleres.time AS time,
                    talleres.descriptionworkshop AS descriptionworkshop
                FROM
                    talleres
                INNER JOIN
                    facultades ON talleres.idfacultad = facultades.idfacultad
                INNER JOIN
                    campus ON talleres.idcampus = campus.idcampus
                WHERE
                    talleres.idworkshop = ?";
                    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $idworkshop);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = array(
                //"idworkshop" => $row["idworkshop"]
                //nombre en js =>   nombre en bd
                "idworkshop" => $row["idworkshop"],
                "nameworkshop" => $row["nameworkshop"],
                "facultad" => $row["facultad"],
                "campus" => $row["campus"],
                "date" => $row["date"],
                "time" => $row["time"],
                "dworkshop" => $row["descriptionworkshop"],
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
