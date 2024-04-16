<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir métodos HTTP GET, POST, y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Permitir los encabezados Content-Type y Authorization en las solicitudes CORS
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
include("../conection.php");

// Verificar si se reciben datos de inicio de sesión
if(isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT iduser, username, password FROM admin WHERE username = '$username'";
    $result = mysqli_query($conn, $query);

    if($result && mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        $stored_hashed_password = $row['password'];

        if (password_verify($password, $stored_hashed_password)) {
            $token = generateToken();
            $_SESSION['access_token'] = $token;
            echo json_encode(['success' => true, 'token' => $token, 'userId' => $row['iduser'], 'userName' => $row['username']]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Contraseña incorrecta']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Usuario no encontrado']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No se recibieron datos de inicio de sesión']);
}

// Función para generar un token de sesión
function generateToken()
{
    return bin2hex(random_bytes(32));
}
?>
