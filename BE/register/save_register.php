<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir métodos HTTP GET, POST, y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Permitir los encabezados Content-Type y Authorization en las solicitudes CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo($_POST['nombre']);
    if (isset($_POST["nombre"], $_POST["apellidoP"], $_POST["apellidoM"], $_POST["email"], $_POST["option"])) {
        $nombre = $_POST["nombre"];
        $apellidoP = $_POST["apellidoP"];
        $apellidoM = $_POST["apellidoM"];
        $email = $_POST["email"];
        $option = $_POST["option"];
        
        if(isset($_POST["id"])) {
            $id = $_POST["id"];
            
            $stmt_check = $conn->prepare("SELECT iduabc FROM usuarios WHERE iduabc = ?");
            $stmt_check->bind_param("s", $id);
            $stmt_check->execute();
            $result = $stmt_check->get_result();
            
            if ($result->num_rows > 0) {
                $stmt_update = $conn->prepare("UPDATE usuarios SET name = ?, lastname = ?, middlename = ?, email = ?, type = ? WHERE iduabc = ?");
                $stmt_update->bind_param("ssssss", $nombre, $apellidoP, $apellidoM, $email, $option, $id);
                $stmt_update->execute();
                
                $stmt_registro = $conn->prepare("INSERT INTO registro (iduabc) VALUES (?)");
                $stmt_registro->bind_param("s", $id);
                $stmt_registro->execute();
                
                echo json_encode(array("success" => true));
                
                $stmt_update->close();
                $stmt_registro->close();
            } else {
                $stmt_insert_usuarios = $conn->prepare("INSERT INTO usuarios (iduabc, name, lastname, middlename, email, type) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt_insert_usuarios->bind_param("ssssss", $id, $nombre, $apellidoP, $apellidoM, $email, $option);
                $stmt_insert_usuarios->execute();
                
                $stmt_insert_registro = $conn->prepare("INSERT INTO registro (iduabc) VALUES (?)");
                $stmt_insert_registro->bind_param("s", $id);
                $stmt_insert_registro->execute();
                
                echo json_encode(array("success" => true));
                
                $stmt_insert_usuarios->close();
                $stmt_insert_registro->close();
            }
            
            $stmt_check->close();
        } else {
            $stmt_insert_registro = $conn->prepare("INSERT INTO registro DEFAULT VALUES");
            $stmt_insert_registro->execute();
            
            echo json_encode(array("success" => true));
            
            $stmt_insert_registro->close();
        }

        $conn->close();
        exit();
    }
}
?>