<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['nameworkshop'], $_POST['descriptionworkshop'], $_POST['time'], $_POST['date'], $_POST['ability'], $_POST['post'], $_POST['idcampus'], $_POST['idfacultad'], $_POST['idlecturer'])) {
        $nameworkshop = $_POST['nameworkshop'];
        $descriptionworkshop = $_POST['descriptionworkshop'];
        $time = $_POST['time'];
        $date = $_POST['date'];
        $ability = $_POST['ability'];
        $post = $_POST['post'];
        $idcampus = $_POST['idcampus'];
        $idfacultad = $_POST['idfacultad'];
        $idlecturer = $_POST['idlecturer'];

        if ($nameworkshop && $descriptionworkshop && $time && $date && $ability && $post && $idcampus && $idfacultad) {
            $sql = "INSERT INTO talleres (nameworkshop, descriptionworkshop, time, date, ability, post, idcampus, idfacultad, idlecturer)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
    
            if ($stmt) {
                $stmt->bind_param("ssssssiii", $nameworkshop, $descriptionworkshop, $time, $date, $ability, $post, $idcampus, $idfacultad, $idlecturer);
                
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
