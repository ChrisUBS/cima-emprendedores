//Validacion de todos los campos.
function isValid() {

}
//Animacion de las notificaciones
function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}
//main
function init() {
    $("#btnNext").click(register);
}

$(document).ready(function () {
    init();
});