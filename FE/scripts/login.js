//Animacion de las notificaciones
function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}


// Función para validar los campos del formulario
function validateForm() {
    let username = $("#username").val().trim();
    let password = $("#password").val().trim();

    if (username === '' || password === '') {
        notifications('alert-error', 'Por favor, completa todos los campos.');
        return false;
    }

    return true;
}

// Función para realizar el inicio de sesión
let apiURL="http://localhost/cimarronesEmprendedores/BE/"
function login() {
    if (!validateForm()) {
        return;
    }

    let username = $("#username").val().trim();
    let password = $("#password").val().trim();

    $.ajax({
        type: "POST",
        url: `${apiURL}users/login.php`,
        data: {username: username, password: password},
        success: function(response) {
            if (response === 'success') {
                // window.location.href = "dashboard.php";
                notifications('alert-success','Listo'); //URL
                setTimeout(function () {
                    $('#login').hide();
                    $('#admin').show();
                }, 4500);
            } else {
                notifications('alert-error', 'Nombre de usuario o contraseña incorrectos.');
            }
        },
        error: function() {
            notifications('alert-error', 'Error de conexión.');
        }
    });
}

function init() {
    $("#login").show();
    $("#admin").hide();
    $("#btnLogin").click(login);
}

$(document).ready(function () {
    init();
});