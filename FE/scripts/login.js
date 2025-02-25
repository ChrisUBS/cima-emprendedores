// Función para validar los campos del formulario
function validateLogin() {
    let username = $("#username").val().trim();
    let password = $("#password").val().trim();

    if (username === '' || password === '') {
        $(".error").text("Por favor, completa todos los campos.").css("color", "red").stop(true, true).slideDown(300).delay(1000).slideUp(300);
    }else{
        SuccessLogin();
    }
}

// Función para realizar el inicio de sesión
let apiURL="http://localhost/cimarrones-emprendedores/BE/"

function SuccessLogin() {
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
                // Guardar el token en el sessionStorage
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('username', response.userName);
                $(".success").text("Inicio de sesión exitoso!").css("color", "green").stop(true, true).slideDown(300).delay(1000).slideUp(300);
                setTimeout(function () {
                    window.location.href = "fe/home.html";
                }, 2000);
            } else {
                $(".error").text(response.error).css("color", "red").stop(true, true).slideDown(300).delay(1000).slideUp(300);
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

function init() {
    $("#btnLogin").click(function() {
        var button = $(this);
        button.prop('disabled', true);
        setTimeout(function() {
            button.prop('disabled', false);
        }, 2000);
    });
    $("#login").show();
    $("#admin").hide();
    $("#btnLogin").click(validateLogin);
}

$(document).ready(function () {
    init();
});