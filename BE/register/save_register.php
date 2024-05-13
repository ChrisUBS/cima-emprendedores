<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include("../conection.php");
require '../vendor/autoload.php';
require '../plugins/phpqrcode/qrlib.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendEmail($to, $subject, $body, $attachment = null) {
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
        $mail->Body = $body;

        // Adjuntar archivo si se proporciona
        if ($attachment) {
            $mail->addAttachment($attachment, basename($attachment));
        }

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
                    echo json_encode(array("success" => false, "message" => "Error al actualizar el usuario."));
                    exit();
                }
                $stmt_update->close();
            } else {
                $stmt_insert = $conn->prepare("INSERT INTO usuarios (name, lastname, middlename, email, type, idfacultad, idcampus, idlic, iduabc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt_insert->bind_param("sssssiiii", $nombre, $apellidoP, $apellidoM, $email, $option, $idfacultad, $idcampus, $idlic, $id);
                if (!$stmt_insert->execute()) {
                    echo json_encode(array("success" => false, "message" => "Error al insertar el usuario."));
                    exit();
                }
            }
            $stmt_registro = $conn->prepare("INSERT INTO registro (iduabc, idcampus, idworkshop, name, lastname, middlename, type) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt_registro->bind_param("iiissss", $id, $idcampus, $idworkshop, $nombre, $apellidoP, $apellidoM, $option);
            $stmt_registro->execute();
            $idregistro = $conn->insert_id;
            $stmt_registro->close();
        }else{
            $stmt_registro = $conn->prepare("INSERT INTO registro (idcampus, idworkshop, name, lastname, middlename, type) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt_registro->bind_param("iissss",$idcampus, $idworkshop, $nombre, $apellidoP, $apellidoM, $option);
            $stmt_registro->execute();
            $idregistro = $conn->insert_id;
            $stmt_registro->close();
        }


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

        // Enviar correo electrónico con el código QR adjunto
        $to = $email;
        $subject = 'Cimarrones Emprendedores';
        $body = '¡Gracias por registrarte! Adjunto encontrarás tu código QR.';
        
        // Enviar el correo con el código QR adjunto
        $isSent = sendEmail($to, $subject, $body, $filename);

        echo json_encode(array("success" => true, "message" => "Operación realizada con éxito.", "emailSent" => $isSent));
    } else {
        echo json_encode(array("success" => false, "message" => "Faltan parámetros requeridos."));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Método de solicitud no permitido."));
}

$conn->close();
?>
