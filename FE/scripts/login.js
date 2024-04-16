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
    var username = $("#username").val();
    var password = $("#password").val();

    $.ajax({
        type: "POST",
        url: `${apiURL}users/login.php`,
        data: {
            username: username,
            password: password
        },
        dataType: "json",
        success: function(response) {
            if(response.success) {
                // Guardar el token en el almacenamiento local
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.userName);
                notifications('alert-success','Inicio de sesión exitoso');
                setTimeout(function () {
                    window.location.href = "adminHome.html";
                }, 4000);
            } else {
                notifications('alert-error', response.error);
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
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