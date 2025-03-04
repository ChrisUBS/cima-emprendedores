let logoutURL = "http://localhost/cimarrones-emprendedores/BE/";

function logout() {
    $.ajax({
        type: "GET",
        url: `${logoutURL}users/logout.php`,
        dataType: "json",
        success: function(response) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            window.location.href = "../login.html";
        },
        error: function(xhr, status, error) {
            console.error(xhr, status, error);
        }
    });
}

function validToken(){
    var token = sessionStorage.getItem('token');
    if (!token) {
        window.location.href = "../login.html";
    }
}

function initLogout() {
    
    $("#btnLogOut").click(logout);
}

$(document).ready(function () {
    validToken();
    initLogout();
});