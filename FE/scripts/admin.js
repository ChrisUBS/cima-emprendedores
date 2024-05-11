function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}

let apiURL = "http://localhost/cimarrones-emprendedores/BE/";
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
                            <td>${registro.type}</td>
                            <td>${registro.nameworkshop}</td>
                            <td>${registro.date}</td>
                            <td>
                                <input type="checkbox" ${registro.assist === 1 ? 'checked' : ''}>
                            </td>
                        </tr>
                    `);
                });
            } else {
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
