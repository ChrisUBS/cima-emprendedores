<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../vendor/autoload.php'; // Asegúrate de tener instalado con Composer
include("../conection.php");

#No manda el QR bien (NO FUNCIONA) - ARREGLAR.

use chillerlan\QRCode\QRCode;
// use chillerlan\QRCode\QROptions;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendEmail($to, $subject, $body, $attachment) {
    $mail = new PHPMailer(true);
    
    try {
        // Servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'johan.barragan@uabc.edu.mx';
        $mail->Password = 'lioplpjswtazgtqn'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Configura correo electrónico
        $mail->setFrom('cimarronesemprendedores@uabc.edu.mx', 'Cimarrones Emprendedores');
        $mail->addAddress($to);
        $mail->Subject = $subject;
        $mail->Body = $body;

        // Adjunta el archivo
        $mail->addAttachment($attachment);
        
        // Envía el correo electrónico
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("No se pudo enviar el correo: {$mail->ErrorInfo}");
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["nombre"], $_POST["apellidoP"], $_POST["apellidoM"], $_POST["email"], $_POST["option"], $_POST["id"])) {
        $nombre = $_POST["nombre"];
        $apellidoP = $_POST["apellidoP"];
        $apellidoM = $_POST["apellidoM"];
        $email = $_POST["email"];
        $option = $_POST["option"];
        $id = $_POST["id"];

        // Generar código QR
        $data = "Nombre: $nombre\nApellido Paterno: $apellidoP\nApellido Materno: $apellidoM\nCorreo Electrónico: $email\nOpción: $option";
        $qrcode = (new QRCode())->render($data);
        
        // Guardar el código QR en un archivo temporal
        $qrFilename = $id . '_qr.png';
        file_put_contents($qrFilename, $qrcode);

        if (isset($id)) {
            $stmt_check = $conn->prepare("SELECT iduabc FROM usuarios WHERE iduabc = ?");
            $stmt_check->bind_param("s", $id);
            $stmt_check->execute();
            $result = $stmt_check->get_result();
            
            if ($result->num_rows > 0) {
                $stmt_update = $conn->prepare("UPDATE usuarios SET name = ?, lastname = ?, middlename = ?, email = ?, type = ? WHERE iduabc = ?");
                $stmt_update->bind_param("ssssss", $nombre, $apellidoP, $apellidoM, $email, $option, $id);
                $stmt_update->execute();
                $stmt_update->close();
            } else {
                $stmt_insert = $conn->prepare("INSERT INTO usuarios (iduabc, name, lastname, middlename, email, type) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt_insert->bind_param("ssssss", $id, $nombre, $apellidoP, $apellidoM, $email, $option);
                $stmt_insert->execute();
                $stmt_insert->close();
            }
            $stmt_check->close();
        }
        $stmt_registro = $conn->prepare("INSERT INTO registro (iduabc) VALUES (?)");
        $stmt_registro->bind_param("s", $id);
        $stmt_registro->execute();
        $stmt_registro->close();
        
        // Enviar correo electrónico con el código QR adjunto
        $to = $email;
        $subject = 'Cimarrones Emprendedores';
        $body = 'Código QR adjunto:';
        $isSent = sendEmail($to, $subject, $body, $qrFilename);
        
        $conn->close();
        
        echo json_encode(array("success" => $isSent));
        exit();
    } else {
        echo json_encode(array("success" => false, "message" => "Error"));
    }
}
?>


<!-- [Phar]
; https://php.net/phar.readonly
;phar.readonly = On

; https://php.net/phar.require-hash
;phar.require_hash = On

;phar.cache_list =

[mail function]
; For Win32 only.
; https://php.net/smtp
SMTP=smtp.gmail.com
; https://php.net/smtp-port
smtp_port=587

; For Win32 only.
; https://php.net/sendmail-from
sendmail_from = "johan.barragan@uabc.edu.mx"

; For Unix only.  You may supply arguments as well (default: "sendmail -t -i").
; https://php.net/sendmail-path
sendmail_path = "\"C:\xampp\sendmail\sendmail.exe" -t" -->

<!-- [sendmail]

smtp_server=smtp.gmail.com
smtp_port=587
error_logfile=error.log
debug_logfile=debug.log
auth_username=johan.barragan@uabc.edu.mx
auth_password=lioplpjswtazgtqn
force_sender=johan.barragan@uabc.edu.mx -->