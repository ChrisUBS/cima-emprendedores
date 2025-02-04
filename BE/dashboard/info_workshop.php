<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET["idworkshop"])) {
        $idworkshop = $_GET["idworkshop"];

        $query = "SELECT
                        talleres.idworkshop,
                        talleres.nameworkshop,
                        talleres.descriptionworkshop,
                        talleres.time,
                        talleres.timeend,
                        talleres.date,
                        talleres.ability,
                        talleres.requirements,
                        talleres.place,
                        talleres.slot,
                        talleres.idcampus,
                        talleres.idfacultad,
                        talleres.idlecturer,
                        facultades.facultad,
                        campus.campus,
                        conferencistas.name AS lecturer_name,
                        conferencistas.lastname AS lecturer_lastname,
                        (SELECT COUNT(*) FROM registro WHERE registro.idworkshop = talleres.idworkshop) AS occupied_slots
                    FROM
                        talleres
                    INNER JOIN facultades ON talleres.idfacultad = facultades.idfacultad
                    INNER JOIN campus ON talleres.idcampus = campus.idcampus
                    INNER JOIN conferencistas ON talleres.idlecturer = conferencistas.idlecturer
                    WHERE
                        talleres.idworkshop = ?";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $idworkshop);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = array(
                    "idworkshop" => $row["idworkshop"],
                    "nameworkshop" => $row["nameworkshop"],
                    "descriptionworkshop" => $row["descriptionworkshop"],
                    "time" => $row["time"],
                    "timeend" => $row["timeend"],
                    "date" => $row["date"],
                    "ability" => $row["ability"],
                    "requirements" => $row["requirements"],
                    "place" => $row["place"],
                    "slot" => $row["slot"],
                    "idcampus" => $row["idcampus"],
                    "idfacultad" => $row["idfacultad"],
                    "idlecturer" => $row["idlecturer"],
                    "facultad" => $row["facultad"],
                    "campus" => $row["campus"],
                    "lecturer" => $row["lecturer_name"] . " " . $row["lecturer_lastname"],
                    "occupied_slots" => $row["occupied_slots"]
                );
            }
            echo json_encode(array("success" => true, "data" => $data));
        } else {
            echo json_encode(array("success" => false, "error" => "No se encontraron datos para el taller con el ID proporcionado."));
        }
        
        $stmt->close();
    } else {
        echo json_encode(array("success" => false, "error" => "ID de taller no proporcionado."));
    }
} else {
    echo json_encode(array("success" => false, "error" => "Solicitud no válida."));
}
$conn->close();
?>
