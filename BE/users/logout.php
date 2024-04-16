<!-- Logout -->

<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Content-Type: application/json');

session_id('cimarron');
session_start();
session_unset();
session_destroy();

$response = [
'status' => 'success',
'message' => 'Logged out',
];

echo json_encode($response);

exit();