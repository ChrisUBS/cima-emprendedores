<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['name'], $_POST['lastname'], $_POST['middlename'])) {
        $name = $_POST['name'];
        $lastname = $_POST['lastname'];
        $middlename = $_POST['middlename'];
        $info = $_POST['info'] ?? NULL;

        if ($name && $lastname && $middlename && $info) {
            $sql = "INSERT INTO conferencistas (name, lastname, middlename, info)
                    VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
    
            if ($stmt) {
                $stmt->bind_param("ssss", $name, $lastname, $middlename, $info);
                
                if ($stmt->execute()) {
                    $response = array(
                        "success" => true,
                        "message" => "Conferencista agregado exitosamente"
                    );
                } else {
                    $response = array(
                        "success" => false,
                        "error" => "Error al agregar conferencista: " . $stmt->error
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
