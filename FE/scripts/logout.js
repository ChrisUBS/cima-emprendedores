let logoutURL = "http://localhost/cimarrones-emprendedores/BE/";

function logout() {
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
            console.error(xhr, status, error);
        }
    });
}

function initLogout() {
    $("#btnLogOut").click(logout);
}

$(document).ready(function () {
    initLogout();
});
