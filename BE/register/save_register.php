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
    if (isset($_POST["nombre"], $_POST["apellidoP"], $_POST["apellidoM"], $_POST["email"], $_POST["option"], $_POST["id"], $_POST["idfacultad"])) {
        $nombre = $_POST["nombre"];
        $apellidoP = $_POST["apellidoP"];
        $apellidoM = $_POST["apellidoM"];
        $email = $_POST["email"];
        $option = $_POST["option"];
        $id = $_POST["id"];
        $idfacultad = $_POST["idfacultad"];
        $idlic = $_POST["idlic"];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(array("success" => false, "message" => "El formato del correo electrónico no es válido."));
            exit();
        }

        $stmt_check = $conn->prepare("SELECT iduabc FROM usuarios WHERE iduabc = ?");
        $stmt_check->bind_param("s", $id);
        if (!$stmt_check->execute()) {
            echo json_encode(array("success" => false, "message" => "Error al verificar el ID en la base de datos."));
            exit();
        }
        $result = $stmt_check->get_result();

        $isRecordUpdated = false;
        if ($result->num_rows > 0) {
            $stmt_update = $conn->prepare("UPDATE usuarios SET name = ?, lastname = ?, middlename = ?, email = ?, type = ?, idfacultad = ?, idlic = ? WHERE iduabc = ?");
            $stmt_update->bind_param("ssssssii", $nombre, $apellidoP, $apellidoM, $email, $option, $idfacultad, $idlic, $id);
            if (!$stmt_update->execute()) {
                echo json_encode(array("success" => false, "message" => "Error al actualizar el registro."));
                exit();
            }
            $stmt_update->close();
            $isRecordUpdated = true;
        } else {
            $stmt_insert = $conn->prepare("INSERT INTO usuarios (iduabc, idfacultad, name, lastname, middlename, email, type, idlic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt_insert->bind_param("issssssi", $id, $idfacultad, $nombre, $apellidoP, $apellidoM, $email, $option, $idlic);
            if (!$stmt_insert->execute()) {
                echo json_encode(array("success" => false, "message" => "Error al insertar un nuevo registro."));
                exit();
            }
            $stmt_insert->close();
            $isRecordUpdated = true;
        }
        $stmt_check->close();

        // Si se actualizó o insertó el registro, se genera el código QR
        if ($isRecordUpdated) {
            #REINCORPARAR LA RELACION DE IDWORKSHOP Y AÑADIR EN EL INSERT.
            $stmt_registro = $conn->prepare("INSERT INTO registro (iduabc, idfacultad, name, lastname, middlename, type) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt_registro->bind_param("iissss", $id, $idfacultad, $nombre, $apellidoP, $apellidoM, $option);
            $stmt_registro->execute();
            $idregistro = $conn->insert_id;
            $stmt_registro->close();

            // Directorio donde se guardará la imagen QR
            $dir = '../plugins/codes/';

            // Crear el directorio si no existe
            if (!file_exists($dir)) {
                mkdir($dir, 0777, true);
            }

            // Ruta del archivo QR a generar
            $filename = $dir . $idregistro . '_qr.png';

            // Parámetros de configuración del código QR
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
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Faltan parámetros requeridos."));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Método de solicitud no permitido."));
}

$conn->close();
?>
