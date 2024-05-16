<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['idworkshop'], $_POST['idcampus'], $_POST['q1'], $_POST['q2'], $_POST['q3'], $_POST['q4'], $_POST['q5'], $_POST['q6'], $_POST['q7'], $_POST['q8'], $_POST['q9'])) {
        $idworkshop = $_POST['idworkshop'];
        $idcampus = $_POST['idcampus'];
        $question1 = $_POST['q1'];
        $question2 = $_POST['q2'];
        $question3 = $_POST['q3'];
        $question4 = $_POST['q4'];
        $question5 = $_POST['q5'];
        $question6 = $_POST['q6'];
        $question7 = $_POST['q7'];
        $question8 = $_POST['q8'];
        $question9 = $_POST['q9'];

        if ($nameworkshop && $descriptionworkshop && $time && $date && $ability && $post && $idcampus && $idfacultad) {
            $sql = "INSERT INTO feedback (idworkshop, idcampus, q1, q2, q3, q4, q5, q6, q7, q8, q9)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
    
            if ($stmt) {
                $stmt->bind_param("iisssssssss", $idworkshop, $idcampus, $question1, $question2, $question3, $question4, $question5, $question6, $question7, $question8, $question9);
                
                if ($stmt->execute()) {
                    $response = array(
                        "success" => true,
                        "message" => "Taller agregado exitosamente"
                    );
                } else {
                    $response = array(
                        "success" => false,
                        "error" => "Error al agregar taller: " . $stmt->error
                    );
                }
    
                $stmt->close();
            } else {
                $response = array(
                    "success" => false,
                    "error" => "No se pudo preparar la consulta: " . $conn->error
                );
            }
        } else {
            $response = array(
                "success" => false,
                "error" => "Datos de entrada inválidos o incompletos"
            );
        }
    
        $conn->close();
    
        echo json_encode($response);
    } else {
        $response = array(
            "success" => false,
            "error" => "Solicitud no válida"
        );
        echo json_encode($response);
    }
}
?>
