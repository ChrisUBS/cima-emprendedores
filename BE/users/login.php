<?php
header('Content-Type: application/json');
include("../conection.php");

// Verificar si se reciben datos de inicio de sesión
if(isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Consultar la base de datos para obtener el hash de la contraseña almacenada
    $query = "SELECT password FROM admin WHERE username = '$username'";
    $result = mysqli_query($conn, $query);

    if($result && mysqli_num_rows($result) == 1) {
        // Obtener el hash de la contraseña almacenada
        $row = mysqli_fetch_assoc($result);
        $stored_hashed_password = $row['password'];

        if(password_verify($password, $stored_hashed_password)) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Contraseña incorrecta'));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Usuario no encontrado'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'No se recibieron datos de inicio de sesión'));
}
?>
