<?php
include("conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["nombre"], $_POST["apellidoP"], $_POST["apellidoM"], $_POST["email"])) {
        $nombre = $_POST["nombre"];
        $apellidoP = $_POST["apellidoP"];
        $apellidoM = $_POST["apellidoM"];
        $email = $_POST["email"];
        
        $stmt = $conn->prepare("INSERT INTO usuarios (name, lastname, middlename, email) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nombre, $apellidoP, $apellidoM, $email);
        
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