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
    $nameworkshop = $_POST['nameworkshop'];
    $descriptionworkshop = $_POST['descriptionworkshop'];
    $time = $_POST['time'];
    $date = $_POST['date'];
    $ability = $_POST['ability'];
    $post = $_POST['post'];
    $campus = $_POST['campus'];

    

    $sql = "INSERT INTO talleres (nameworkshop, descriptionworkshop, time, date, ability, post, campus)
            VALUES ('$nameworkshop', '$descriptionworkshop', '$time', '$date', '$ability', '$post', '$campus')";

    if ($conn->query($sql) === TRUE) {
        $response = array(
            "success" => true,
            "message" => "Taller añadido exitosamente"
        );
    } else {
        $response = array(
            "success" => false,
            "error" => "Error al añadir taller: " . $conn->error
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
