<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['nameworkshop'], $_POST['time'], $_POST['timeend'], $_POST['date'], $_POST['place'], $_POST['slot'], $_POST['idcampus'], $_POST['idfacultad'], $_POST['idlecturer'])) {
        $nameworkshop = $_POST['nameworkshop'];
        $descriptionworkshop = $_POST['descriptionworkshop'] ?? NULL;
        $time = $_POST['time'];
        $timeend = $_POST['timeend'];
        $date = $_POST['date'];
        $ability = $_POST['ability'] ?? NULL;
        $requirements = $_POST['requirements'] ?? NULL;
        $place = $_POST['place'];
        $slot = $_POST['slot'];
        $idcampus = $_POST['idcampus'];
        $idfacultad = $_POST['idfacultad'];
        $idlecturer = $_POST['idlecturer'];

        if ($nameworkshop && $time && $date && $place && $slot && $idcampus && $idfacultad) {
            $sql = "INSERT INTO talleres (nameworkshop, descriptionworkshop, time, timeend, date, ability, requirements, place, slot, idcampus, idfacultad, idlecturer)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
    
            if ($stmt) {
                $stmt->bind_param("sssssssiiii", $nameworkshop, $descriptionworkshop, $time, $time, $date, $ability, $requirements, $place, $slot, $idcampus, $idfacultad, $idlecturer);
                
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
