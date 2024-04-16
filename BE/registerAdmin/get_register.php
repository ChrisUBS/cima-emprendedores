<?php
include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        
        $query = "SELECT u.iduabc, u.type, t.nameworkshop as taller, r.idfacultad, r.assist, t.date as fecha_registro
          FROM usuarios u
          INNER JOIN registro r ON u.iduabc = r.iduabc
          INNER JOIN talleres t ON r.idtaller = t.idworkshop
          WHERE u.iduabc = ?";

        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $id);
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                echo json_encode(array(
                    "success" => true,
                    "id" => $row["iduabc"],
                    "tipo" => $row["type"],
                    "taller" => $row["nameworkshop"],
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
