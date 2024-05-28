<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["nombre"], $_POST["apellidoP"], $_POST["apellidoM"], $_POST["option"], $_POST["idcampus"], $_POST["idworkshop"], $_POST["assist"])) {
        $nombre = $_POST["nombre"];
        $apellidoP = $_POST["apellidoP"];
        $apellidoM = $_POST["apellidoM"];
        $option = $_POST["option"];
        $idcampus = $_POST["idcampus"];
        $idworkshop = $_POST["idworkshop"];
        $assist = $_POST["assist"];

        // Insertar registro en la base de datos
        $stmt_registro = $conn->prepare("INSERT INTO registro (idcampus, idworkshop, name, lastname, middlename, type, assist) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt_registro->bind_param("iisssss", $idcampus, $idworkshop, $nombre, $apellidoP, $apellidoM, $option, $assist);

        if ($stmt_registro->execute()) {
            echo json_encode(array("success" => true, "message" => "Registro insertado con éxito."));
        } else {
            echo json_encode(array("success" => false, "message" => "Error al insertar el registro."));
        }

        $stmt_registro->close();
    } else {
        echo json_encode(array("success" => false, "message" => "Parámetros incompletos."));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Método de solicitud no permitido."));
}

$conn->close();
?>
