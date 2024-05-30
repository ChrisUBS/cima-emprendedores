//TALLERES JS

var apiURL = "http://localhost/cimarrones-emprendedores/BE/";
function statusChange() {
    $('#listaTalleres').on('click', '#workshopStatus', function() {
        const workshopId = $(this).closest('tr').find('td:first').attr('id');
        const isChecked = $(this).prop('checked') ? 1 : 0;
        console.log(workshopId, isChecked);
        $.ajax({
            url: `${apiURL}dashboard/status_change.php`,
            type: 'POST',
            dataType: "json",
            data: {
                idworkshop: workshopId,
                status: isChecked
            },
            success: function(response) {
                console.log(response);
                if (response.success) {
                    // console.log("Estado del taller actualizado con éxito");
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
        url: `${apiURL}dashboard/get_lect.php`,
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
        url: `${apiURL}dashboard/get_workshop.php`,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                updateWorkshopList(response.data);
            } else {
                console.log("alert-error", response.error);
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
            <input type="text" id="place" name="place" required>
            <label for="place">Lugar</label>
        </div>
        <div class="input-general">
            <input type="number" id="slot" name="slot" required>
            <label for="slot">Cupos</label>
        </div>
        <div class="input-general">
            <input type="text" id="ability" name="ability" required>
            <label for="ability">Habilidades requeridas</label>
        </div>
        <div class="input-general">
            <input type="text" id="requirements" name="requirements" required>
            <label for="requirements">Requerimientos</label>
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
        //El status del workshop cambia automaticamente desde el get_workshop que identifica si hay slots o si no cambia el status.
        listaTalleres.append(`
                <tr>
                    <td id="${workshop.idworkshop}">${workshop.nameworkshop}</td>
                    <td>${workshop.facultad}</td>
                    <td>${workshop.campus}</td>
                    <td>${workshop.date}</td>
                    <td>${workshop.time}</td>
                    <td>${workshop.place}</td>
                    <td>${workshop.occupied_slots}/${workshop.slot}</td>
                    <td>
                        <input id="workshopStatus" type="checkbox" ${workshop.status === 1 ? 'checked' : ''}> 
                        <span class="status-text">${workshop.status === 1 ? 'Activo' : 'Inactivo'}</span>
                    </td>
                    <td>
                        <form id="options">
                            <button type="button" title="Informacion" class="btn-class btnDetails" data-id="${workshop.idworkshop}" id="infoButton"><i class="fa-solid fa-circle-info"></i></button>
                            <button type="button" title="Editar" class="btn-class btnDetails" data-id="${workshop.idworkshop}" id="editButton"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button type="button" title="Copiar" class="btn-class btnDetails" data-id="${workshop.idworkshop}" id="copyButton"><i class="fa-solid fa-copy"></i></button>
                            <button type="button" title="Eliminar" class="btn-class btnDetails" data-id="${workshop.idworkshop}" id="deleteButton"><i class="fa-solid fa-trash"></i></button>
                            <button type="button" title="Enviar formulario" class="btn-class btnDetails" data-id="${workshop.idworkshop}" id="sendButton"><i class="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </td>
                </tr>
        `);
    });
    if ($.fn.dataTable.isDataTable('#table')) {
        $('#table').DataTable().destroy();
    }

    const table = $('#table').DataTable({
        language: {
            url: './plugins/es-ES.json'
            // url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
        },
        paging: true,
        searching: true,
        ordering: true,
        lengthMenu: [5, 10, 25, 50],
        pageLength: 10,
        columnDefs: [
            { className: "dt-center", targets: "_all" }
        ],
        buttons: [
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel' },
            { extend: 'pdf' },
            { extend: 'print' }
        ],
        responsive: true,
        scrollY: "400px",
        scrollCollapse: true,
        initComplete: function() {
            $(window).on('resize', function() {
                table.columns.adjust();
            });
        }
    });
    
    $('#btnExportCopy').on('click', function() {
        table.button('.buttons-copy').trigger();
    });
    $('#btnExportCsv').on('click', function() {
        table.button('.buttons-csv').trigger();
    });
    $('#btnExportExcel').on('click', function() {
        table.button('.buttons-excel').trigger();
    });
    $('#btnExportPdf').on('click', function() {
        table.button('.buttons-pdf').trigger();
    });
    $('#btnExportPrint').on('click', function() {
        table.button('.buttons-print').trigger();
    });

    // Actualiza el texto de asistencia cuando se cambia el checkbox
    $('#listaTalleres').on('change', '#workshopStatus', function() {
        const isChecked = $(this).is(':checked');
        const statusText = isChecked ? 'Activo' : 'Inactivo';
        $(this).siblings('.status-text').text(statusText);
        const idworkshop = $(this).closest('tr').find('td:first').attr('id');
        $.ajax({
            url: `${apiURL}dashboard/status_change.php`,
            type: 'POST',
            dataType: "json",
            data: {
                idworkshop: idworkshop,
                status: isChecked ? 1 : 0,
            },
            success: function(response) {
                console.log(response);
                if (response.success) {
                    // Estado del usuario actualizado con éxito
                } else {
                    console.log("Error al actualizar el estado del usuario:", response.error);
                }
            },
            error: function(xhr, status, error) {
                console.log("Error en la solicitud:", xhr, status, error);
            }
        });
    });
}

// Función para eliminar un taller
function deleteWorkshop(selectedIdWorkshop) {
    if (!selectedIdWorkshop) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    $.ajax({
        url: `${apiURL}dashboard/delete_workshop.php`,
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
        url: `${apiURL}dashboard/info_workshop.php`,
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
                                <p><strong>Requerimientos:</strong> ${infoworkshop.requirements}</p>
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

// Autorellenar datos del workshop 
function showWorkshopData(selectedIdWorkshop, modalSelected) {
    if (!selectedIdWorkshop) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    var $modalBody = $(modalSelected);

    $.ajax({
        url: `${apiURL}dashboard/info_workshop.php`,
        type: 'GET',
        dataType: "json",
        data: {
            idworkshop: selectedIdWorkshop,
        },
        success: function(response) {
            if (response.success) {
                const workshopData = response.data[0];
                $modalBody.find('#nameworkshop').val(workshopData.nameworkshop);
                $modalBody.find('#descriptionworkshop').val(workshopData.dworkshop);
                $modalBody.find('#time').val(workshopData.time);
                $modalBody.find('#date').val(workshopData.date);
                $modalBody.find('#place').val(workshopData.place);
                $modalBody.find('#slot').val(workshopData.slot);
                $modalBody.find('#ability').val(workshopData.ability);
                $modalBody.find('#requirements').val(workshopData.requirements);
                $modalBody.find('#campus').val(workshopData.idcampus);
                getFacultad(workshopData.idfacultad);
                $modalBody.find('#txtFacultad').val(workshopData.idfacultad);
                getLect(workshopData.idlecturer);
                $modalBody.find('#lect').val(workshopData.idlecturer);
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
    var place = $('#editModalBody #place').val();
    var slot = $('#editModalBody #slot').val();
    var ability = $('#editModalBody #ability').val();
    var requirements = $('#editModalBody #requirements').val();
    var idcampus = $('#editModalBody #campus').val();
    var idfacultad = $('#editModalBody #txtFacultad').val();
    var idlecturer = $('#editModalBody #lect').val(); 
    $.ajax({
        url: `${apiURL}dashboard/edit_workshop.php`,
        type: 'POST',
        dataType: "json",
        data: {
            nameworkshop: nameworkshop,
            descriptionworkshop: descriptionworkshop,
            time: time,
            date: date,
            place: place,
            slot: slot,
            ability: ability,
            requirements: requirements,
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

function addWorkshop(modalSelected) {
    var $modalBody = $(modalSelected);

    var nameworkshop = $modalBody.find('#nameworkshop').val();
    var descriptionworkshop = $modalBody.find('#descriptionworkshop').val();
    var time = $modalBody.find('#time').val();
    var date = $modalBody.find('#date').val();
    var place = $modalBody.find('#place').val();
    var slot = $modalBody.find('#slot').val();
    var ability = $modalBody.find('#ability').val();
    var requirements = $modalBody.find('#requirements').val();
    var idcampus = $modalBody.find('#campus').val();
    var idfacultad = $modalBody.find('#txtFacultad').val();
    var idlecturer = $modalBody.find('#lect').val();

    $.ajax({
        url: `${apiURL}dashboard/saved_workshop.php`,
        type: 'POST',
        dataType: "json",
        data: {
            nameworkshop: nameworkshop,
            descriptionworkshop: descriptionworkshop,
            time: time,
            date: date,
            place: place,
            slot: slot,
            ability: ability,
            requirements: requirements,
            idcampus: idcampus,
            idfacultad: idfacultad,
            idlecturer: idlecturer,
        },
        success: function(response) {
            if (response.success) {
                getWorkshops();
                setTimeout(function() {
                    location.reload();
                });
            } else {
                console.log("alert-error", `Error al agregar el taller: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

function sendFeedback(selectedIdWorkshop) {
    if (!selectedIdWorkshop) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }

    $.ajax({
        url: `${apiURL}users/send_feedback.php`,
        type: 'GET',
        dataType: "json",
        data: {
            idworkshop: selectedIdWorkshop,
        },
        success: function(response) {
            if (response.success) {
                // console.log("alert-success", "Correos de evaluación enviados exitosamente.");
                setTimeout(function() {
                    location.reload();
                }, 1000);
            } else {
                console.log("alert-error", `Error al enviar los correos de evaluación: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

// Inicialización de eventos y carga inicial de datos.
function init() {
    $("sendConfirm").click(function() {
        var button = $(this);
        button.prop('disabled', true);
        setTimeout(function() {
            button.prop('disabled', false);
        }, 2000);
    });
    getWorkshops();
    statusChange();
    $(document).on('click', '.btn-class', function(event) {
        const action = event.currentTarget.id;
        const selectedIdWorkshop = $(event.currentTarget).data('id');//Guardar el id del donde se clickea.
        switch (action) {
            case 'addButton':
                var addModalBody = document.getElementById('editModalBody');
                addModalBody.innerHTML = '';
                var addModalBody = document.getElementById('copyModalBody');
                addModalBody.innerHTML = '';
                $('#addModal').modal('show');
                workshopTable('addModalBody');
                getLect();
                $('#campus').on('change', function() {
                    getFacultad();
                });
                $('#addModalConfirm').on('click', function() {
                    addWorkshop('#addModalBody');
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
                var addModalBody = document.getElementById('copyModalBody');
                addModalBody.innerHTML = '';
                $('#editModal').modal('show');
                workshopTable('editModalBody');
                $('#campus').on('change', function() {
                    getFacultad();
                });
                showWorkshopData(selectedIdWorkshop, '#editModalBody');
                console.log(selectedIdWorkshop);
                $('#editModalEdit').off('click').on('click', function() {
                    editWorkshop(selectedIdWorkshop);
                });
                $('#editModalClose').off('click').on('click', function() {
                    $('#editModal').modal('hide');
                });
                break;
            case 'copyButton':
                var addModalBody = document.getElementById('addModalBody');
                addModalBody.innerHTML = '';
                var addModalBody = document.getElementById('editModalBody');
                addModalBody.innerHTML = '';
                $('#copyModal').modal('show');
                workshopTable('copyModalBody');
                $('#campus').on('change', function() {
                    getFacultad();
                });
                showWorkshopData(selectedIdWorkshop, '#copyModalBody');
                console.log(selectedIdWorkshop);
                $('#copyConfirm').off('click').on('click', function() {
                    addWorkshop('#copyModalBody');
                });
                $('#copyModalClose').off('click').on('click', function() {
                    $('#copyModal').modal('hide');
                });
                break;
            case 'deleteButton':
                $('#deleteModal').modal('show');
                $('#deleteModalClose').off('click').on('click', function() {
                    $('#deleteModal').modal('hide');
                });
                $('#deleteConfirm').off('click').on('click', function() {
                    deleteWorkshop(selectedIdWorkshop);
                    setTimeout(function () {
                        location.reload();
                    });
                    closeModal('#deleteModal');
                });
                break;
            case 'sendButton':
                
                console.log(selectedIdWorkshop);
                $('#sendModal').modal('show');
                $('#sendModalClose').off('click').on('click', function() {
                    $('#sendModal').modal('hide');
                });
                $('#sendConfirm').off('click').on('click', function() {
                    $('#sendConfirm').prop('disabled', true);
                    sendFeedback(selectedIdWorkshop);
                    setTimeout(() => {
                        $('#sendConfirm').prop('disabled', false);
                    }, 5000);
                });
                break;
            default:
                // console.error(`Acción no reconocida: ${action}`);
                break;
        }
    });
}

$(document).ready(function() {
    init();
});
