//REGISTROS JS.

let apiURL = "http://localhost/cimarrones-emprendedores/BE/";

function searchToDatabase() {
    $.ajax({
        type: "GET",
        url: `${apiURL}dashboard/get_lect.php`,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                updateLectList(response.lect);
            } else {
                console.log("alert-error", errorMessage);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr, status, error);
            console.log("alert-error", "Error en la solicitud al servidor.");
        }
    });
}

function updateLectList(lect){
    const listaConferencistas = $('#listaConferencistas');
    listaConferencistas.empty();

    lect.forEach(lect => {
        listaConferencistas.append(`
            <tr id="${lect.idlecturer}">
                <td>${lect.idlecturer}</td>
                <td>${lect.name}</td>
                <td>${lect.lastname} ${lect.middlename}</td>
                <td>${lect.info}</td>
                <td>
                <form id="options">
                    <button type="button" title="Informacion" class="btn-class btnDetails" data-id="${lect.idlecturer}" id="infoButton"><i class="fa-solid fa-circle-info"></i></button>
                    <button type="button" title="Editar" class="btn-class btnDetails" data-id="${lect.idlecturer}" id="editButton"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" title="Eliminar" class="btn-class btnDetails" data-id="${lect.idlecturer}" id="deleteButton"><i class="fa-solid fa-trash"></i></button>
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
            {
                className: "dt-center",
                targets: "_all"
            },
            {
                targets: 3,
                render: function(data, type, row) {
                    if (type === 'display' && data.length > 100) {
                        return data.substr(0, 50) + '…';
                        // '… <a href="#" class="more">Más</a>'
                    } else {
                        return data;
                    }
                }
            }
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
}

function lectTable(modalBodyId) {
    const modalBody = document.getElementById(modalBodyId);
    
    if (!modalBody) {
        console.error(`El elemento con el ID "${modalBodyId}" no se encontró.`);
        return;
    }
    
    modalBody.innerHTML = '';
    const newHTML = `
        <div class="input-general">
            <input type="text" id="namelect" name="namelect" required>
            <label for="namelect">Nombre(s)</label>
        </div>
        <div class="input-general">
            <input type="text" id="middlename" name="middlename" required>
            <label for="middlename">Nombre Paterno</label>
        </div>
        <div class="input-general">
            <input type="text" id="lastname" name="lastname" required>
            <label for="lastname">Nombre Materno</label>
        </div>
        <div class="input-general">
            <textarea id="info" name="info" required></textarea>
            <label for="info">Información</label>
        </div>
        `;

    modalBody.innerHTML = newHTML;
}

// Autorellenar datos del conferencista 
function showLectData(selectedIdLect, modalSelected) {
    if (!selectedIdLect) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    var $modalBody = $(modalSelected);

    $.ajax({
        url: `${apiURL}dashboard/info_lect.php`,
        type: 'GET',
        dataType: "json",
        data: {
            idlecturer: selectedIdLect,
        },
        success: function(response) {
            if (response.success) {
                const workshopData = response.data[0];
                $modalBody.find('#namelect').val(workshopData.name);
                $modalBody.find('#middlename').val(workshopData.middlename);
                $modalBody.find('#lastname').val(workshopData.lastname);
                $modalBody.find('#info').val(workshopData.info);
            } else {
                console.log("alert-error", `Error al mostrar info del conferencista: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

// Función para agregar un conferencista
function addLect(modalSelected) {
    var $modalBody = $(modalSelected);

    var namelect = $modalBody.find('#namelect').val();
    var middlename = $modalBody.find('#middlename').val();
    var lastname = $modalBody.find('#lastname').val();
    var info = $modalBody.find('#info').val();
    console.log(info, namelect,lastname,info);

    $.ajax({
        url: `${apiURL}dashboard/save_lect.php`,
        type: 'POST',
        dataType: "json",
        data: {
            name: namelect,
            middlename: middlename,
            lastname: lastname,
            info: info
        },
        success: function(response) {
            if (response.success) {
                setTimeout(function() {
                    location.reload();
                });
            } else {
                console.log("alert-error", `Error al agregar al conferencista: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

// Función para obtener info de un conferencista
function getInfoModal(selectedIdLect) {
    if (!selectedIdLect) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    $.ajax({
        url: `${apiURL}dashboard/info_lect.php`,
        type: 'GET',
        dataType: "json",
        data: {
            idlecturer: selectedIdLect,
        },
        success: function(response) {
            if (response.success) {
                $('#infoModalBody').empty();
                response.data.forEach(function(infoLect) {
                        $('#infoModalBody').append(`
                        <div class="workshop-info">
                            <h3 class="workshop-title">${infoLect.name}</h3>
                            <div class="workshop-details">
                                <p><strong>Apellidos:</strong> ${infoLect.lastname} ${infoLect.middlename}</p>
                                <p><strong>Informacion:</strong> ${infoLect.info}</p>
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

// Función para editar un conferencista
function editLect(selectedIdLect){
    if (!selectedIdLect) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    var name = $('#editModalBody #namelect').val();
    var lastname = $('#editModalBody #lastname').val();
    var middlename = $('#editModalBody #middlename').val();
    var info = $('#editModalBody #info').val();
    $.ajax({
        url: `${apiURL}dashboard/edit_lect.php`,
        type: 'POST',
        dataType: "json",
        data: {
            idlecturer: selectedIdLect,
            name: name,
            lastname: lastname,
            middlename: middlename,
            info: info,
        },
        success: function(response) {
            if (response.success) {
                console.log("alert-success", `Conferencista editado con éxito: ${response.message}`);
                $('#editModal').modal('hide');
                setTimeout(function () {
                    location.reload();
                });
            } else {
                console.log("alert-error", `Error al mostrar info del conferencista: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

// Función para eliminar un conferencista
function deleteLect(selectedIdLect) {
    if (!selectedIdLect) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    $.ajax({
        url: `${apiURL}dashboard/delete_lect.php`,
        type: 'POST',
        dataType: "json",
        data: {
            idlecturer: selectedIdLect,
        },
        success: function(response) {
            if (response.success) {
                console.log("alert-success", `Taller eliminado con éxito: ${response.message}`);
                $('#deleteModal').modal('hide');
                setTimeout(function () {
                    location.reload();
                });
            } else {
                console.log("alert-error", `Error al eliminar el taller: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}

function init() {
    searchToDatabase();
    $(document).on('click', '.btn-class', function(event) {
        const action = event.currentTarget.id;
        const selectedIdLect = $(event.currentTarget).data('id');//Guardar el id del donde se clickea.
        switch (action) {
            case 'addButton':
                var addModalBody = document.getElementById('editModalBody');
                addModalBody.innerHTML = '';
                $('#addModal').modal('show');
                lectTable('addModalBody');
                $('#addModalConfirm').on('click', function() {
                    addLect('#addModalBody');
                });
                $('#addModalClose').on('click', function() {
                    $('#addModal').modal('hide');
                });
                break;
            case 'infoButton':
                $('#infoModal').modal('show');
                getInfoModal(selectedIdLect);
                $('#infoModalClose').off('click').on('click', function() {
                    $('#infoModal').modal('hide');
                });
                break;
            case 'editButton':
                var addModalBody = document.getElementById('addModalBody');
                addModalBody.innerHTML = '';
                $('#editModal').modal('show');
                lectTable('editModalBody');
                showLectData(selectedIdLect, '#editModalBody');
                $('#editModalEdit').off('click').on('click', function() {
                    editLect(selectedIdLect);
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
                $('#deleteConfirm').off('click').on('click', function() {
                    deleteLect(selectedIdLect);
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
