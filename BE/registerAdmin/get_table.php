<?php
include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["id"])) {
    $id = $_GET["id"];
    
    $query = "SELECT u.iduabc, u.type, t.nameworkshop as taller, r.idfacultad, r.assist, t.date as fecha_registro
            FROM usuarios u
            INNER JOIN registro r ON u.iduabc = r.iduabc
            INNER JOIN talleres t ON r.idtaller = t.idworkshop
            WHERE u.iduabc = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = array(
                "iduabc" => $row["iduabc"],
                "type" => $row["type"],
                "taller" => $row["taller"],
                "fecha_registro" => $row["fecha_registro"],
                "assist" => $row["assist"]
            );
        }
        echo json_encode(array("success" => true, "data" => $data));
    } else {
        echo json_encode(array("success" => false, "error" => "No se encontraron datos en la base de datos."));
    }
    
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "error" => "Solicitud no válida."));
}
$conn->close();
?>
