function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}

<<<<<<< HEAD
let apiURL = "http://localhost:3000/cimarrones-emprendedores/BE/";
=======
let apiURL = "http://localhost/cimarrones-emprendedores/BE/";
>>>>>>> ed364fef26f142ee6113acd781d8f6f5fef2a0fd
function searchToDatabase() {
    $.ajax({
        type: "GET", // Cambiar de POST a GET
        url: `${apiURL}registerAdmin/get_table.php`,
        dataType: "json",
        success: function(response) {
            console.log(response);
            if (response.success) {
                $('#listaAlumnos').empty();
                
                response.data.forEach(function(registro) {
                    $('#listaAlumnos').append(`
                        <tr>
                            <td>${registro.iduabc}</td>
                            <td>${registro.lastname}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    `);
                });
            } else {
                var errorMessage = "Error en la respuesta del servidor.";
                if (response.error) {
                    errorMessage = response.error;
                }
                notifications("alert-error", errorMessage);
            }
        },
        error: function(xhr, status, error) {
            console.log(error);
            notifications("alert-error", "Error en la solicitud al servidor.");
        }
    });
}


function init() {
    searchToDatabase();

    $('#searchForm').on('submit', function(event) {
        event.preventDefault();
        searchToDatabase();
    });
}

$(document).ready(function() {
    init();
});
