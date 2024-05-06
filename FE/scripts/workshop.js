var apiURL = "http://localhost/cimarrones-emprendedores/BE/";
function getFacultad(selectedFacultad) {
    var selectedUbicacion = $("#campus").val();
    $.ajax({
        type: "GET",
        url: `${apiURL}register/get_faculty.php`,
        data: { ubicacion: selectedUbicacion },
        success: function (response) {
            var selectFacultad = $("#txtFacultad");
            
            selectFacultad.empty();

            if (response && response.facultades && response.facultades.length > 0) {
                $('#txtFacultad').prop('disabled', false);
                selectFacultad.append("<option value=''></option>");
                response.facultades.forEach(facultad => {
                    selectFacultad.append(`<option value='${facultad.idfacultad}' id='${facultad.idfacultad}' ${selectedFacultad==facultad.idfacultad?'selected':''}>${facultad.nombre}</option>`);
                });
            } else {
                $('#txtFacultad').prop('disabled', true);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al obtener las facultades:", error);
        }
    });
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
                console.log("alert-error", errorMessage);
            }
        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log("alert-error", "Error en la solicitud al servidor.");
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
        console.log("alert-error", "Error: ID de taller no seleccionado.");
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
                console.log("alert-success", `Taller eliminado con éxito: ${response.message}`);
                getWorkshops();
            } else {
                console.log("alert-error", `Error al eliminar el taller: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

// Cargar informacion de un taller.
function getInfoModal(selectedIdWorkshop) {
    if (!selectedIdWorkshop) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
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
                $('#infoModalBody').empty();
                    response.data.forEach(function(infoworkshop) {
                        $('#infoModalBody').append(`
                        <h3>${infoworkshop.nameworkshop}</h3>
                        <p>Facultad: ${infoworkshop.facultad}</p>
                        <p>Id Facultad: ${infoworkshop.idfacultad}</p>
                        <p>Campus: ${infoworkshop.campus}</p>
                        <p>Fecha: ${infoworkshop.date}</p>
                        <p>Hora: ${infoworkshop.time}</p>
                        <p>Descripción: ${infoworkshop.dworkshop}</p>
                    `);
                });
            } else {
                console.log("alert-error", `Error al mostrar info del taller: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

// Autorellenar el edit del workshop 
function showEditWorkshop(selectedIdWorkshop){
    if (!selectedIdWorkshop) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
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
                const workshopData = response.data[0];
                $('#editModalBody #nameworkshop').val(workshopData.nameworkshop);
                $('#editModalBody #descriptionworkshop').val(workshopData.dworkshop);
                $('#editModalBody #time').val(workshopData.time);
                $('#editModalBody #date').val(workshopData.date);
                $('#editModalBody #ability').val(workshopData.ability);
                $('#editModalBody #post').val(workshopData.post);
                $('#editModalBody #campus').val(workshopData.idcampus);
                getFacultad(workshopData.idfacultad);
                $('#editModalBody #txtFacultad').val(workshopData.idfacultad);
            } else {
                console.log("alert-error", `Error al mostrar info del taller: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

// Editar el workshop
function editWorkshop(selectedIdWorkshop){
    if (!selectedIdWorkshop) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    var nameworkshop = $('#editModalBody #nameworkshop').val();
    var descriptionworkshop = $('#editModalBody #descriptionworkshop').val();
    var time = $('#editModalBody #time').val();
    var date = $('#editModalBody #date').val();
    var ability = $('#editModalBody #ability').val();
    var post = $('#editModalBody #post').val();
    var idcampus = $('#editModalBody #campus').val();
    var idfacultad = $('#editModalBody #txtFacultad').val();
    $.ajax({
        url: `${apiURL}registerAdmin/edit_workshop.php`,
        type: 'POST',
        dataType: "json",
        data: {
            nameworkshop: nameworkshop,
            descriptionworkshop: descriptionworkshop,
            time: time,
            date: date,
            ability: ability,
            post: post,
            idcampus: idcampus,
            idfacultad: idfacultad,
            idworkshop: selectedIdWorkshop,
        },
        success: function(response) {
            if (response.success) {
                console.log("alert-success", `Taller editado con éxito: ${response.message}`);
                $('#editModal').modal('hide');
                getWorkshops();
            } else {
                console.log("alert-error", `Error al mostrar info del taller: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

function addWorkshop(){
    var nameworkshop = $('#addModalBody #nameworkshop').val();
    var descriptionworkshop = $('#addModalBody #descriptionworkshop').val();
    var time = $('#addModalBody #time').val();
    var date = $('#addModalBody #date').val();
    var ability = $('#addModalBody #ability').val();
    var post = $('#addModalBody #post').val();
    var idcampus = $('#addModalBody #campus').val();
    var idfacultad = $('#addModalBody #txtFacultad').val();
    $.ajax({
        url: `${apiURL}registerAdmin/edit_workshop.php`,
        type: 'POST',
        dataType: "json",
        data: {
            nameworkshop: nameworkshop,
            descriptionworkshop: descriptionworkshop,
            time: time,
            date: date,
            ability: ability,
            post: post,
            idcampus: idcampus,
            idfacultad: idfacultad,
        },
        success: function(response) {
            if (response.success) {
                $('#addModalBody #campus').val(workshopData.idcampus);
                getFacultad(workshopData.idfacultad);
                $('#addModalBody #txtFacultad').val(workshopData.idfacultad);
                $('#addModal').modal('hide');
                getWorkshops();
            } else {
                console.log("alert-error", `Error al mostrar info del taller: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

// Inicialización de eventos y carga inicial de datos
function init() {
    getWorkshops();
    $('#addButton').on('click', function() {
        $('#addModal').modal('show');
    });
    $('#addModalConfirm').on('click', function() {
        addWorkshop();

    });
    $('#addModalClose').on('click', function() {
        $('#addModal').modal('hide');
    });


    $(document).on('click', '.btn-class', function(event) {
        const action = event.currentTarget.id;
        const selectedIdWorkshop = $(event.currentTarget).data('id');//Guardar el id del donde se clickea.
        
        switch (action) {
            case 'info':
                // console.log("Acción 'info' seleccionada", selectedIdWorkshop);
                $('#infoModal').modal('show');
                getInfoModal(selectedIdWorkshop);
                $('#infoModalClose').off('click').on('click', function() {
                    $('#infoModal').modal('hide');
                });
                break;
            case 'edit':
                $('#editModal').modal('show');
                $('#campus').on('change', function() {
                    getFacultad();
                });
                showEditWorkshop(selectedIdWorkshop);
                $('#editModalEdit').off('click').on('click', function() {
                    editWorkshop(selectedIdWorkshop);
                    // setTimeout(function () {
                    //     location.reload();
                    // });
                });
                $('#editModalClose').off('click').on('click', function() {
                    $('#editModal').modal('hide');
                });
                break;
            case 'delete':
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
