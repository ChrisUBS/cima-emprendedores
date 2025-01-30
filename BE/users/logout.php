<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir métodos HTTP GET, POST, y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Permitir los encabezados Content-Type y Authorization en las solicitudes CORS
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
include("../conection.php");

session_start();

$_SESSION = array();

if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time()-42000, '/');
}

session_destroy();

echo json_encode(['status' => 'success', 'message' => 'Sesión cerrada']);
exit;
?>
