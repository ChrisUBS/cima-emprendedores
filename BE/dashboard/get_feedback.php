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
    
    $query = "SELECT
                feedback.idfeedback AS idfeedback,
                talleres.nameworkshop as workshop,
                campus.campus AS campus,
                feedback.q1 AS q1,
                feedback.q2 AS q2,
                feedback.q3 AS q3,
                feedback.q4 AS q4,
                feedback.q5 AS q5,
                feedback.q6 AS q6,
                feedback.q7 AS q7,
                feedback.q8 AS q8,
                feedback.q9 AS q9
            FROM
                feedback
            INNER JOIN
                talleres ON feedback.idworkshop = talleres.idworkshop
            INNER JOIN
                campus ON feedback.idcampus = campus.idcampus";
    $result = $conn->query($query);
    
    $feedback = array();

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $feedback[] = array(
                "idfeedback" => $row["idfeedback"],
                "workshop" => $row["workshop"],
                "campus" => $row["campus"],
                "q1" => $row["q1"],
                "q2" => $row["q2"],
                "q3" => $row["q3"],
                "q4" => $row["q4"],
                "q5" => $row["q5"],
                "q6" => $row["q6"],
                "q7" => $row["q7"],
                "q8" => $row["q8"],
                "q9" => $row["q9"],
            );
        }

        $result->free();
        
        if (count($feedback) > 0) {
            echo json_encode(array("success" => true, "feedback" => $feedback));
        } else {
            echo json_encode(array("success" => false, "error" => "No se encontraron feedback."));
        }
    } else {
        echo json_encode(array("success" => false, "error" => "Error al ejecutar la consulta: " . $conn->error));
    }
    
    $conn->close();
} else {
    echo json_encode(array("success" => false, "error" => "Solicitud no válida. Solo se permiten solicitudes GET."));
}
?>
