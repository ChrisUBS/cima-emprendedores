let apiURL = "http://localhost/cimarrones-emprendedores/BE/";
function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}

function statusChange() {
    $('#listaAlumnos').on('click', '#registroAssist', function() {
        const idregistro = $(this).closest('tr').attr('id');
        const assist = $(this).prop('checked') ? 1 : 0;
        console.log(idregistro, assist);
        $.ajax({
            url: `${apiURL}registerAdmin/status_change.php`,
            type: 'POST',
            dataType: "json",
            data: {
                idregistro: idregistro,
                assist: assist,
            },
            success: function(response) {
                console.log(response);
                if (response.success) {
                    console.log("Estado del taller actualizado con éxito");
                } else {
                    console.log("Error al actualizar el estado del taller:", response.error);
                }
            },
            error: function(xhr, status, error) {
                console.log("Error en la solicitud:",xhr, status,error);
            }
        });
    });
}

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
                        <tr id="${registro.idregistro}">
                            <td>${registro.iduabc}</td>
                            <td>${registro.type}</td>
                            <td>${registro.nameworkshop}</td>
                            <td>${registro.date}</td>
                            <td>
                                <input id="registroAssist" type="checkbox" ${registro.assist === 1 ? 'checked' : ''}>
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
    statusChange();
    $('#searchForm').on('submit', function(event) {
        event.preventDefault();
        searchToDatabase();
    });
}

$(document).ready(function() {
    init();
});
