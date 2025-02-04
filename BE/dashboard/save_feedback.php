<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['idworkshop'], $_POST['idcampus'], $_POST['email'], $_POST['q1'], $_POST['q2'], $_POST['q3'], $_POST['q4'], $_POST['q5'], $_POST['q6'], $_POST['q7'], $_POST['q8'], $_POST['q9'])) {
        $idworkshop = $_POST['idworkshop'];
        $idcampus = $_POST['idcampus'];
        $email = $_POST['email'];
        $q1 = $_POST['q1'];
        $q2 = $_POST['q2'];
        $q3 = $_POST['q3'];
        $q4 = $_POST['q4'];
        $q5 = $_POST['q5'];
        $q6 = $_POST['q6'];
        $q7 = $_POST['q7'];
        $q8 = $_POST['q8'];
        $q9 = $_POST['q9'];

        if ($idworkshop && $idcampus && $email && $q1 && $q2 && $q3 && $q4 && $q5 && $q6 && $q7 && $q8 && $q9) {
            $sql = "INSERT INTO feedback (idworkshop, idcampus, email, q1, q2, q3, q4, q5, q6, q7, q8, q9)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
    
            if ($stmt) {
                $stmt->bind_param("ssssssssssss", $idworkshop, $idcampus, $email, $q1, $q2, $q3, $q4, $q5, $q6, $q7, $q8, $q9);
                
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
