<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Permitir los encabezados Content-Type y Authorization en las solicitudes CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include("../conection.php");
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    // Verificar la conexión a la base de datos
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $query = "SELECT
                usuarios.iduabc AS iduabc,
                usuarios.name as name,
                usuarios.lastname as lastname,
                usuarios.middlename as middlename,
                usuarios.idcampus AS idcampus,
                usuarios.idfacultad AS idfacultad,
                usuarios.idlic AS idlic,
                campus.campus AS campus,
                facultades.facultad AS facultad,
                licenciaturas.namelic AS namelic,
                usuarios.email as email,
                usuarios.type as type
            FROM
                usuarios
            INNER JOIN
                facultades ON usuarios.idfacultad = facultades.idfacultad
            INNER JOIN
                licenciaturas ON usuarios.idlic = licenciaturas.idlic
            INNER JOIN
                campus ON usuarios.idcampus = campus.idcampus";
                    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = array(
                "iduabc" => $row["iduabc"],
                "name" => $row["name"],
                "lastname" => $row["lastname"],
                "middlename" => $row["middlename"],
                "idcampus" => $row["idcampus"],
                "idfacultad" => $row["idfacultad"],
                "idlic" => $row["idlic"],
                "campus" => $row["campus"],
                "facultad" => $row["facultad"],
                "namelic" => $row["namelic"],
                "email" => $row["email"],
                "type" => $row["type"],
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
