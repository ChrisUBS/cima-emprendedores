<?php
error_reporting(E_ERROR | E_PARSE);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("../conection.php");
require '../vendor/autoload.php';
require '../plugins/phpqrcode/qrlib.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendEmail($to, $subject, $body, $qrPath, $cid) {
    $mail = new PHPMailer(true);
    
    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'johan.barragan@uabc.edu.mx';
        $mail->Password = 'lioplpjswtazgtqn'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Configuración del correo electrónico
        $mail->setFrom('cimarronesemprendedores@uabc.edu.mx', 'Cimarrones Emprendedores');
        $mail->addAddress($to);
        $mail->Subject = $subject;
        $mail->isHTML(true);

        // Adjuntar imagen del código QR en el cuerpo del correo
        if ($qrPath) {
            $mail->AddEmbeddedImage($qrPath, $cid, basename($qrPath));
        }

        $mail->Body = $body;

        // Enviar el correo
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Error al enviar el correo: {$mail->ErrorInfo}");
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["nombre"], $_POST["apellidoP"], $_POST["apellidoM"], $_POST["email"], $_POST["option"], $_POST["idcampus"], $_POST["idworkshop"])) {
        $nombre = $_POST["nombre"];
        $apellidoP = $_POST["apellidoP"];
        $apellidoM = $_POST["apellidoM"];
        $email = $_POST["email"];
        $option = $_POST["option"];
        $idcampus = $_POST["idcampus"];
        $idworkshop = $_POST["idworkshop"];
        $idfacultad = isset($_POST["idfacultad"]) ? $_POST["idfacultad"] : null;
        $id = isset($_POST["id"]) ? $_POST["id"] : null;
        $idlic = isset($_POST["idlic"]) ? $_POST["idlic"] : null;

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(array("success" => false, "message" => "El formato del correo electrónico no es válido."));
            exit();
        }

        try {
            if ($id !== null) {
                $stmt_check = $conn->prepare("SELECT iduabc FROM usuarios WHERE iduabc = ?");
                $stmt_check->bind_param("i", $id);
                $stmt_check->execute();
                $result = $stmt_check->get_result();
                $stmt_check->close();

                if ($result->num_rows > 0) {
                    $stmt_update = $conn->prepare("UPDATE usuarios SET name = ?, lastname = ?, middlename = ?, email = ?, type = ?, idfacultad = ?, idcampus = ?, idlic = ? WHERE iduabc = ?");
                    $stmt_update->bind_param("sssssiiii", $nombre, $apellidoP, $apellidoM, $email, $option, $idfacultad, $idcampus, $idlic, $id);
                    if (!$stmt_update->execute()) {
                        throw new Exception("Error al actualizar el usuario.");
                    }
                    $stmt_update->close();
                } else {
                    $stmt_insert = $conn->prepare("INSERT INTO usuarios (name, lastname, middlename, email, type, idfacultad, idcampus, idlic, iduabc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    $stmt_insert->bind_param("sssssiiii", $nombre, $apellidoP, $apellidoM, $email, $option, $idfacultad, $idcampus, $idlic, $id);
                    if (!$stmt_insert->execute()) {
                        throw new Exception("Error al insertar el usuario.");
                    }
                    $stmt_insert->close();
                }
                $stmt_registro = $conn->prepare("INSERT INTO registro (iduabc, idcampus, idworkshop, name, lastname, middlename, type, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt_registro->bind_param("iiisssss", $id, $idcampus, $idworkshop, $nombre, $apellidoP, $apellidoM, $option, $email);
            } else {
                $stmt_registro = $conn->prepare("INSERT INTO registro (idcampus, idworkshop, name, lastname, middlename, type, email) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt_registro->bind_param("iisssss", $idcampus, $idworkshop, $nombre, $apellidoP, $apellidoM, $option, $email);
            }

            $stmt_registro->execute();
            $idregistro = $conn->insert_id;
            $stmt_registro->close();

            // Generación del código QR
            $dir = '../plugins/codes/';
            if (!file_exists($dir)) {
                mkdir($dir, 0777, true);
            }

            // Ruta de archivo QR a generar
            $filename = $dir . $idregistro . '_qr.png';

            // Configuración del código QR
            $tamaño = 10;
            $level = 'L';
            $frameSize = 3;
            $contenido = $idregistro;

            // Generar el código QR
            QRcode::png($contenido, $filename, $level, $tamaño, $frameSize);

            // Crear el CID para el QR
            $cid = md5(uniqid(time()));

            // Crear el cuerpo del correo con el QR en HTML
            $to = $email;
            $subject = 'Cimarrones Emprendedores';
            $body = "
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                    }
                    .container {
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        max-width: 600px;
                        margin: auto;
                    }
                    .header {
                        background-color: #f8f8f8;
                        padding: 10px;
                        text-align: center;
                        border-bottom: 1px solid #ddd;
                    }
                    .header h1 {
                        margin: 0;
                    }
                    .content {
                        padding: 20px;
                    }
                    .content p {
                        margin: 0 0 10px;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        border-top: 1px solid #ddd;
                        background-color: #f8f8f8;
                        border-bottom-left-radius: 10px;
                        border-bottom-right-radius: 10px;
                    }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h1>¡Gracias por Registrarte, $nombre!</h1>
                    </div>
                    <div class='content'>
                        <p>Hola $nombre,</p>
                        <p>Gracias por registrarte en el evento de Cimarrones Emprendedores. Estamos emocionados de que te unas a nosotros.</p>
                        <p>A continuación, encontrarás tu código QR que necesitarás para el acceso al evento:</p>
                        <p><img src='cid:$cid' alt='Código QR'></p>
                        <p>¡Nos vemos pronto!</p>
                    </div>
                    <div class='footer'>
                        <p>&copy; 2025 Cimarrones Emprendedores. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>";

            // Enviar el correo con el código QR en el cuerpo
            $isSent = sendEmail($to, $subject, $body, $filename, $cid);

            echo json_encode(array("success" => true, "message" => "Operación realizada con éxito.", "emailSent" => $isSent));
        } catch (Exception $e) {
            echo json_encode(array("success" => false, "message" => $e->getMessage()));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Faltan parámetros requeridos."));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Método de solicitud no permitido."));
}

$conn->close();
?>
