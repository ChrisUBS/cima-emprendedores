var apiURL = "http://localhost/cimarrones-emprendedores/BE/";

function notifications(type, msg) {
    const div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}

// Función para obtener la lista de talleres desde el servidor
function getWorkshops() {
    $.ajax({
        type: "GET",
        url: `${apiURL}registerAdmin/get_table_workshop.php`,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                updateWorkshopList(response.data);
            } else {
                const errorMessage = response.error || "Error en la respuesta del servidor.";
                notifications("alert-error", errorMessage);
            }
        },
        error: function(xhr, status, error) {
            console.log(error);
            notifications("alert-error", "Error en la solicitud al servidor.");
        }
    });
}

//Actualiza la lista de talleres cada vez que se llame esta funcion.
function updateWorkshopList(workshops) {
    const listaTalleres = $('#listaTalleres');
    listaTalleres.empty();
    
    workshops.forEach(workshop => {
        listaTalleres.append(`
                <tr>
                <td id="${workshop.idworkshop}">${workshop.nameworkshop}</td>
                <td>${workshop.facultad}</td>
                <td>${workshop.campus}</td>
                <td>${workshop.date}</td>
                <td>${workshop.time}</td>
                <td>
                    <form id="options">
                        <button type="button" class="btn-class info" data-id="${workshop.idworkshop}" id="info"><i class="fa-solid fa-circle-info"></i></button>
                        <button type="button" class="btn-class edit" data-id="${workshop.idworkshop}" id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" class="btn-class delete" data-id="${workshop.idworkshop}" id="delete"><i class="fa-solid fa-trash"></i></button>
                    </form>
                </td>
                </tr>
        `);
    });
}

// Función para eliminar un taller
function deleteWorkshop(selectedIdWorkshop) {
    if (!selectedIdWorkshop) {
        notifications("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    $.ajax({
        url: `${apiURL}registerAdmin/delete_workshop.php`,
        type: 'POST',
        dataType: "json",
        data: {
            idworkshop: selectedIdWorkshop,
        },
        success: function(response) {
            if (response.success) {
                notifications("alert-success", `Taller eliminado con éxito: ${response.message}`);
                getWorkshops();
            } else {
                notifications("alert-error", `Error al eliminar el taller: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            notifications("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

// Cargar informacion de un taller.
function getInfoModal(selectedIdWorkshop) {
    if (!selectedIdWorkshop) {
        notifications("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    $.ajax({
        url: `${apiURL}registerAdmin/info_workshop.php`,
        type: 'GET',
        dataType: "json",
        data: {
            idworkshop: selectedIdWorkshop,
        },
        success: function(response) {
            if (response.success) {
                $('#infoBody').empty();
                    response.data.forEach(function(infoworkshop) {
                        $('#infoBody').append(`
                        <h3>${infoworkshop.nameworkshop}</h3>
                        <p>Facultad: ${infoworkshop.facultad}</p>
                        <p>Campus: ${infoworkshop.campus}</p>
                        <p>Fecha: ${infoworkshop.date}</p>
                        <p>Hora: ${infoworkshop.time}</p>
                        <p>Descripción: ${infoworkshop.dworkshop}</p>
                    `);
                });
            } else {
                notifications("alert-error", `Error al mostrar info del taller: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            notifications("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}


// Inicialización de eventos y carga inicial de datos
function init() {
    getWorkshops();
    $(document).on('click', '.btn-class', function(event) {
        const action = event.currentTarget.id;
        const selectedIdWorkshop = $(event.currentTarget).data('id');//Guardar el id del donde se clickea.

        switch (action) {
            case 'edit':
                // console.log("Acción 'edit' seleccionada");
                break;
            case 'info':
                // console.log("Acción 'info' seleccionada", selectedIdWorkshop);
                $('#infoModal').modal('show');
                getInfoModal(selectedIdWorkshop);
                $('#infoModalClose').off('click').on('click', function() {
                    $('#infoModal').modal('hide');
                });
                break;
            case 'delete':
                // console.log("Acción 'delete' seleccionada");
                $('#deleteModal').modal('show');
                $('#deleteModalClose').off('click').on('click', function() {
                    $('#deleteModal').modal('hide');
                });
                $('#confirmDelete').off('click').on('click', function() {
                    deleteWorkshop(selectedIdWorkshop);
                    setTimeout(function () {
                        location.reload();
                    });
                    closeModal('#deleteModal');
                });
                break;
            default:
                console.error(`Acción no reconocida: ${action}`);
                break;
        }
    });
}

$(document).ready(function() {
    init();
});
