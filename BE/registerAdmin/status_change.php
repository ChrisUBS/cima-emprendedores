<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['idworkshop'], $_POST['status'])) {
        $idworkshop = $_POST['idworkshop'];
        $status = $_POST['status'];

        $sql = "UPDATE talleres SET status = ? WHERE idworkshop = ?";

        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("ii", $status, $idworkshop);

            if ($stmt->execute()) {
                $response = array(
                    "success" => true,
                    // "message" => "Estado del taller actualizado exitosamente"
                );
            } else {
                $response = array(
                    "success" => false,
                    // "error" => "Error al actualizar el estado del taller: " . $stmt->error
                );
            }

            $stmt->close();
        } else {
            $response = array(
                "success" => false,
                // "error" => "No se pudo preparar la consulta: " . $conn->error
            );
        }
    } elseif (isset($_POST['assist'], $_POST['idregistro'])) {
        $assist = $_POST['assist'];
        $idregistro = $_POST['idregistro'];

        $sql = "UPDATE registro SET assist = ? WHERE idregistro = ?";

        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("ii", $assist, $idregistro);

            if ($stmt->execute()) {
                $response = array(
                    "success" => true,
                    // "message" => "Asistencia actualizada exitosamente"
                );
            } else {
                $response = array(
                    "success" => false,
                    // "error" => "Error al actualizar la asistencia: " . $stmt->error
                );
            }

            $stmt->close();
        } else {
            $response = array(
                "success" => false,
                // "error" => "No se pudo preparar la consulta: " . $conn->error
            );
        }
    } else {
        $response = array(
            "success" => false,
            // "error" => "Faltan parámetros en la solicitud"
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
