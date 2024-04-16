let logoutURL = "http://localhost:3000/cimarrones-emprendedores/BE/";

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
            console.error(error);
        }
    });
}

function initLogout() {
    $("#btnLogOut").click(logout);
}

$(document).ready(function () {
    initLogout();
});
