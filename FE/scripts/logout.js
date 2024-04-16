// URL del script de logout
let logoutURL = "http://localhost/cimarronesEmprendedores/BE/";

// Función para realizar el logout
function logout() {
    // Realizar una solicitud AJAX para cerrar la sesión
    $.ajax({
        type: "GET",
        url: `${logoutURL}users/logout.php`,
        dataType: "json",
        success: function(response) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = "login.html";
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

// Función para inicializar el comportamiento de logout
function initLogout() {
    // Asignar la función logout al evento clic del botón de logout
    $("#btnLogOut").click(logout);
}

// Ejecutar la función de inicialización cuando el documento esté listo
$(document).ready(function () {
    initLogout();
});
