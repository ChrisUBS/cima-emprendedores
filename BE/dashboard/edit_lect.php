<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['idlecturer'], $_POST['name'], $_POST['lastname'], $_POST['middlename'], $_POST['info'])) {
        $idlecturer = $_POST['idlecturer'];
        $name = $_POST['name'];
        $lastname = $_POST['lastname'];
        $middlename = $_POST['middlename'];
        $info = $_POST['info'];

        $sql = "UPDATE conferencistas SET name = ?, lastname = ?, middlename = ?, info = ? WHERE idlecturer = ?";

        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("sssss", $name, $lastname, $middlename, $info, $idlecturer);

            if ($stmt->execute()) {
                $response = array(
                    "success" => true,
                    "message" => "Taller editado exitosamente"
                );
            } else {
                $response = array(
                    "success" => false,
                    "error" => "Error al editar taller: " . $stmt->error
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
            "error" => "Faltan parámetros en la solicitud"
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
?>
