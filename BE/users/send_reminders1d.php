<?php
require '../vendor/autoload.php';
require '../plugins/phpqrcode/qrlib.php';
require '../conection.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendEmail($to, $subject, $body) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'johan.barragan@uabc.edu.mx';
        $mail->Password = 'lioplpjswtazgtqn'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('cimarronesemprendedores@uabc.edu.mx', 'Cimarrones Emprendedores');
        $mail->addAddress($to);
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $body;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Error al enviar el correo: {$mail->ErrorInfo}");
        return false;
    }
}

$tomorrow = date('Y-m-d', strtotime('+1 day'));

$query = "
    SELECT 
        r.email, r.name, r.lastname, t.nameworkshop, t.date, t.time, t.place
    FROM 
        registro AS r
    JOIN 
        talleres AS t ON r.idworkshop = t.idworkshop
    WHERE 
        t.date = ?
";

if ($stmt = $conn->prepare($query)) {
    $stmt->bind_param("s", $tomorrow);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $recipientEmail = $row['email'];
        $recipientName = $row['name'] . ' ' . $row['lastname'];
        $workshopDetails = "
            <p>Nombre del Taller: " . $row['nameworkshop'] . "</p>
            <p>Fecha: " . $row['date'] . "</p>
            <p>Hora: " . $row['time'] . "</p>
            <p>Lugar: " . $row['place'] . "</p>
        ";
        $subject = "Recordatorio de Taller: " . $row['nameworkshop'];
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
                        <h1>Recordatorio de Taller</h1>
                    </div>
                    <div class='content'>
                        <p>Hola $recipientName,</p>
                        <p>Este es un recordatorio para el siguiente taller:</p>
                        $workshopDetails
                        <p>¡Esperamos verte allí!</p>
                    </div>
                    <div class='footer'>
                        <p>&copy; 2025 Cimarrones Emprendedores. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>";

        sendEmail($recipientEmail, $subject, $body);
    }
    $stmt->close();
} else {
    echo "Error al preparar la consulta: " . $conn->error;
}

$conn->close();
?>
