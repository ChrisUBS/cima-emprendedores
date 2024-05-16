let apiURL = "http://localhost/cimarrones-emprendedores/BE/";
function statusChange() {
    $('#listaAlumnos').on('click', '#registroAssist', function() {
        // const idregistro = $(this).closest('tr').find('td:first').attr('id');
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
                    // console.log("Estado del usuario actualizado con éxito");
                } else {
                    console.log("Error al actualizar el estado del usuario:", response.error);
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
        type: "GET",
        url: `${apiURL}registerAdmin/get_table.php`,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                updateRegisterList(response.data);
            } else {
                console.log("alert-error", errorMessage);
            }
        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log("alert-error", "Error en la solicitud al servidor.");
        }
    });
}

function updateRegisterList(register){
    const listaTalleres = $('#listaAlumnos');
    listaTalleres.empty();
    console.log(register);
    register.forEach(function(registro) {
        $('#listaAlumnos').append(`
            <tr id="${registro.idregistro}">
                <td>${registro.idregistro}</td>
                <td>${registro.name}</td>
                <td>${registro.lastname} ${registro.middlename}</td>
                <td>${registro.type}</td>
                <td>${registro.nameworkshop}</td>
                <td>${registro.campus}</td> 
                <td>${registro.date}</td>
                <td>
                    <input id="registroAssist" type="checkbox" ${registro.assist === 1 ? 'checked' : ''}>
                </td>
            </tr>
        `);
    });
}


function init() {
    searchToDatabase();
    statusChange();
}

$(document).ready(function() {
    init();
});
