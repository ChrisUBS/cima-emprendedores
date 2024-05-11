var apiURL = "http://localhost/cimarrones-emprendedores/BE/";
function statusChange() {
    $('#listaTalleres').on('click', '#workshopStatus', function() {
        const workshopId = $(this).closest('tr').find('td:first').attr('id');
        const isChecked = $(this).prop('checked') ? 1 : 0;
        $.ajax({
            url: `${apiURL}registerAdmin/status_change.php`,
            type: 'POST',
            dataType: "json",
            data: {
                idworkshop: workshopId,
                status: isChecked
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

function getLect(selectedLect) {
    $.ajax({
        type: 'GET',
        url: `${apiURL}registerAdmin/get_lect.php`,
        dataType: 'json',
        success: function(response) {
            const selectLect = $("#lect");
            selectLect.empty();

            if (response && response.lect && response.lect.length > 0) {
                selectLect.prop('disabled', false);
                selectLect.append("<option value=''></option>");
                response.lect.forEach(conferencista => {
                    selectLect.append(`<option value='${conferencista.idlecturer}' id='${conferencista.idlecturer}' ${selectedLect==conferencista.idlecturer ? 'selected' : ''}>${conferencista.name} ${conferencista.lastname} </option>`);
                });
            } else {
                selectLect.prop('disabled', true);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los conferencistas:', error);
        }
    });
}

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

function workshopTable(modalBodyId) {
    const modalBody = document.getElementById(modalBodyId);
    
    if (!modalBody) {
        console.error(`El elemento con el ID "${modalBodyId}" no se encontró.`);
        return;
    }
    
    modalBody.innerHTML = '';
    const newHTML = `
        <div class="input-general">
            <input type="text" id="nameworkshop" name="nameworkshop" required>
            <label for="nameworkshop">Nombre del Taller</label>
        </div>
        <div class="input-general">
            <textarea id="descriptionworkshop" name="descriptionworkshop" required></textarea>
            <label for="descriptionworkshop">Descripción</label>
        </div>
        <div class="input-general">
            <input type="time" id="time" name="time" >
            <label for="time">Hora</label>
        </div>
        <div class="input-general">
            <input type="date" id="date" name="date" >
            <label for="date">Fecha</label>
        </div>
        <div class="input-general">
            <input type="text" id="ability" name="ability" required>
            <label for="ability">Habilidades requeridas</label>
        </div>
        <div class="input-general">
            <input type="text" id="post" name="post" required>
            <label for="post">Post link</label>
        </div>
        <div class="input-general">
            <select name="campus" id="campus" required>
                <option></option>
                <option value="3">Ensenada</option>
                <option value="2">Mexicali</option>
                <option value="1">Tijuana</option>
            </select>
            <label for="campus">Campus</label>
        </div>
        <div class="input-general">
            <select disabled name="txtFacultad" id="txtFacultad" required></select>
            <label for="facultad">Facultad</label>
        </div>
        <div class="input-general">
            <select name="lect" id="lect" required></select>
            <label for="lect">Conferencista</label>
        </div>
        `;

    modalBody.innerHTML = newHTML;
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
                            <button type="button" class="btn-class info" data-id="${workshop.idworkshop}" id="infoButton"><i class="fa-solid fa-circle-info"></i></button>
                            <button type="button" class="btn-class edit" data-id="${workshop.idworkshop}" id="editButton"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button type="button" class="btn-class delete" data-id="${workshop.idworkshop}" id="deleteButton"><i class="fa-solid fa-trash"></i></button>
                        </form>
                    </td>
                    <td>
                        <input id="workshopStatus" type="checkbox" ${workshop.status === 1 ? 'checked' : ''}>
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
                        <div class="workshop-info">
                            <h3 class="workshop-title">${infoworkshop.nameworkshop}</h3>
                            <div class="workshop-details">
                                <p><strong>Facultad:</strong> ${infoworkshop.facultad}</p>
                                <p><strong>Campus:</strong> ${infoworkshop.campus}</p>
                                <p><strong>Fecha:</strong> ${infoworkshop.date}</p>
                                <p><strong>Hora:</strong> ${infoworkshop.time}</p>
                                <p><strong>Descripción:</strong> ${infoworkshop.dworkshop}</p>
                                <p><strong>Conferencista:</strong> ${infoworkshop.lecturer}</p>
                                <p><strong>Post:</strong> ${infoworkshop.post}</p>
                            </div>
                        </div>
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
                getLect(workshopData.idlecturer);
                $('#editModalBody #lect').val(workshopData.idlecturer);
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
    var idlecturer = $('#editModalBody #lect').val(); 
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
            idlecturer: idlecturer,
        },
        success: function(response) {
            if (response.success) {
                console.log("alert-success", `Taller editado con éxito: ${response.message}`);
                $('#editModal').modal('hide');
                getWorkshops();
                setTimeout(function () {
                    location.reload();
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

function addWorkshop(){
    var nameworkshop = $('#addModalBody #nameworkshop').val();
    var descriptionworkshop = $('#addModalBody #descriptionworkshop').val();
    var time = $('#addModalBody #time').val();
    var date = $('#addModalBody #date').val();
    var ability = $('#addModalBody #ability').val();
    var post = $('#addModalBody #post').val();
    var idcampus = $('#addModalBody #campus').val();
    var idfacultad = $('#addModalBody #txtFacultad').val();
    var idlecturer = $('#addModalBody #lect').val();
    $.ajax({
        url: `${apiURL}registerAdmin/saved_workshop.php`,
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
            idlecturer: idlecturer,
        },
        success: function(response) {
            if (response.success) {
                $('#addModal').modal('hide');
                getWorkshops();
                setTimeout(function () {
                    location.reload();
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

// Inicialización de eventos y carga inicial de datos.
function init() {
    getWorkshops();
    statusChange(); 
    $(document).on('click', '.btn-class', function(event) {
        const action = event.currentTarget.id;
        const selectedIdWorkshop = $(event.currentTarget).data('id');//Guardar el id del donde se clickea.
        switch (action) {
            case 'addButton':
                var addModalBody = document.getElementById('editModalBody');
                addModalBody.innerHTML = '';
                $('#addModal').modal('show');
                workshopTable('addModalBody');
                getLect();
                $('#campus').on('change', function() {
                    getFacultad();
                });
                $('#addModalConfirm').on('click', function() {
                    addWorkshop();
                });
                $('#addModalClose').on('click', function() {
                    $('#addModal').modal('hide');
                });
                break;
            case 'infoButton':
                $('#infoModal').modal('show');
                getInfoModal(selectedIdWorkshop);
                $('#infoModalClose').off('click').on('click', function() {
                    $('#infoModal').modal('hide');
                });
                break;
            case 'editButton':
                var addModalBody = document.getElementById('addModalBody');
                addModalBody.innerHTML = '';
                $('#editModal').modal('show');
                workshopTable('editModalBody');
                $('#campus').on('change', function() {
                    getFacultad();
                });
                showEditWorkshop(selectedIdWorkshop);
                $('#editModalEdit').off('click').on('click', function() {
                    editWorkshop(selectedIdWorkshop);
                });
                $('#editModalClose').off('click').on('click', function() {
                    $('#editModal').modal('hide');
                });
                break;
            case 'deleteButton':
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
