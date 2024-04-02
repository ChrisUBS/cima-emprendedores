<?php
include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["id"], $_POST["nombre"], $_POST["apellidoP"], $_POST["apellidoM"], $_POST["email"], $_POST["option"])) {
        $id = $_POST["id"];
        $nombre = $_POST["nombre"];
        $apellidoP = $_POST["apellidoP"];
        $apellidoM = $_POST["apellidoM"];
        $email = $_POST["email"];
        $option = $_POST["option"];
        
        $stmt = $conn->prepare("INSERT INTO usuarios (iduabc, name, lastname, middlename, email,type) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $id, $nombre, $apellidoP, $apellidoM, $email, $option);
        
        if ($stmt->execute() === TRUE) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false, "error" => "Error al insertar los datos en la base de datos."));
        }
        
        $stmt->close();
        $conn->close();
        
        exit();
    }
}

?>