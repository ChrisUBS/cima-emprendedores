<?php
include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        
        $stmt = $conn->prepare("SELECT iduabc, name, lastname, middlename, email FROM usuarios WHERE iduabc = ?");
        $stmt->bind_param("s", $id);
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                echo json_encode(array(
                    "success" => true,
                    "id" => $row["iduabc"],
                    "nombre" => $row["name"],
                    "apellidoP" => $row["lastname"],
                    "apellidoM" => $row["middlename"],
                    "email" => $row["email"]
                ));
            } else {
                echo json_encode(array("success" => false, "error" => "No se encontraron datos en la base de datos."));
            }
        } else {
            echo json_encode(array("success" => false, "error" => "Error al ejecutar la consulta en la base de datos."));
        }
        
        $stmt->close();
        $conn->close();
        
        exit();
    }
}
?>
