<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["idworkshop"])) {
        $idworkshop = $_POST["idworkshop"];

        $stmt_check = $conn->prepare("SELECT idworkshop FROM talleres WHERE idworkshop = ?");
        $stmt_check->bind_param("i", $idworkshop);
        if (!$stmt_check->execute()) {
            echo json_encode(array("success" => false, "message" => "Error al verificar el ID en la base de datos."));
            exit();
        }
        $result = $stmt_check->get_result();

        if ($result->num_rows > 0) {
            $stmt_delete = $conn->prepare("DELETE FROM `talleres` WHERE idworkshop = ?");
            $stmt_delete->bind_param("i", $idworkshop);
            if (!$stmt_delete->execute()) {
                echo json_encode(array("success" => false, "message" => "Error al actualizar el registro."));
                exit();
            }
            $stmt_delete->close();
        } else {
            echo json_encode(array("success" => false, "message" => "No hay talleres con ese ID."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Faltan parámetros requeridos."));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Método de solicitud no permitido."));
}

$conn->close();
?>