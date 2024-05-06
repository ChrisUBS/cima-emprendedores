<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['nameworkshop'], $_POST['descriptionworkshop'], $_POST['time'], $_POST['date'], $_POST['ability'], $_POST['post'], $_POST['idcampus'], $_POST['idfacultad'])) {
        $nameworkshop = $_POST['nameworkshop'];
        $descriptionworkshop = $_POST['descriptionworkshop'];
        $time = $_POST['time'];
        $date = $_POST['date'];
        $ability = $_POST['ability'];
        $post = $_POST['post'];
        $idcampus = $_POST['idcampus'];
        $idfacultad = $_POST['idfacultad'];

        $sql = "INSERT INTO talleres (nameworkshop, descriptionworkshop, time, date, ability, post, idcampus, idfacultad)
            VALUES ('$nameworkshop', '$descriptionworkshop', '$time', '$date', '$ability', '$post', '$idcampus', '$idfacultad')";

        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("ssssssii", $nameworkshop, $descriptionworkshop, $time, $date, $ability, $post, $idcampus, $idfacultad);

            if ($stmt->execute()) {
                $response = array(
                    "success" => true,
                    "message" => "Taller editado exitosamente"
                );
            } else {
                $response = array(
                    "success" => false,
                    "error" => "Error al editar taller: " . $stmt->error
                );
            }

            $stmt->close();
        } else {
            $response = array(
                "success" => false,
                "error" => "No se pudo preparar la consulta: " . $conn->error
            );
        }
    } else {
        $response = array(
            "success" => false,
            "error" => "Faltan parámetros en la solicitud"
        );
    }

    $conn->close();

    echo json_encode($response);
} else {
    $response = array(
        "success" => false,
        "error" => "Solicitud no válida"
    );
    echo json_encode($response);
}
?>
