//---------------------------------------------------------------------------------------------QR Assist Auto
let html5QrCode;
let isScannerPaused = false;

function markAttendance(userId) {
    // console.log(`Marcando asistencia para el usuario: ${userId}`);
    $.ajax({
        url: `${apiURL}dashboard/status_change.php`,
        type: 'POST',
        dataType: "json",
        data: {
            idregistro: userId,
            assist: 1
        },
        success: function(response) {
            if (response.success) {
                alert('Asistencia marcada con éxito!');
                // console.log(`Asistencia marcada para el usuario: ${userId}`);
                updateTableRow(userId);
            } else {
                alert('Error al marcar la asistencia.');
                // console.log(`Error al marcar la asistencia: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error en la solicitud:", xhr, status, error);
            alert('Error en la solicitud, intente de nuevo.');
        }
    });
}

function onScanSuccess(decodedText, decodedResult) {
    // Obtener el ID del taller seleccionado del selector
    const selectedWorkshopId = $("#selectedWorkshop").val();
    const userId = decodedText;
    // console.log(selectedWorkshopId, userId);
    if (!isScannerPaused) {
        isScannerPaused = true;

        searchUserInWorkshop(userId, selectedWorkshopId, function(isValid) {
            if (isValid) {
                markAttendance(userId);
                // alert("Asistencia marcada con éxito para el usuario " + userId);
            } else {
                alert("El usuario " + userId + " no pertenece al taller seleccionado o no existe.");
                console.warn("El usuario no pertenece al taller seleccionado o no existe.");
            }
            setTimeout(() => { isScannerPaused = false; }, 4000);
        });
    }
}


function onScanFailure(error) {
    // console.warn(`Code scan error = ${error}`);
}

function startQrScanner() {
    // Verificar si se ha seleccionado un taller
    const selectedWorkshopId = $("#selectedWorkshop").val();
    if (!selectedWorkshopId || selectedWorkshopId === "") {
        alert("Por favor, seleccione un taller antes de iniciar el escáner.");
        return;
    }

    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 },
        onScanSuccess, onScanFailure).then(() => {
            $('#startQrScanner').hide();
            $('#stopQrScanner').show();
        }).catch(err => {
            console.error("Error al iniciar el escáner: ", err);
        });
}


function stopQrScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            $('#startQrScanner').show();
            $('#stopQrScanner').hide();
            isScannerPaused = false;
        }).catch(err => {
            console.error("Error al detener el escáner: ", err);
        });
    }
}

function initQrScanner() {
    $('#startQrScanner').on('click', function() {
        startQrScanner();
    });

    $('#stopQrScanner').on('click', function() {
        stopQrScanner();
    });

    $('#qrModal').on('hidden.bs.modal', function() {
        stopQrScanner();
    });
}

function updateTableRow(userId) {
    const row = $(`#${userId}`);
    const checkbox = row.find('#registroAssist');
    checkbox.prop('checked', true);
    checkbox.siblings('.assist-text').text('Presente');
}
//---------------------------------------------------------------------------------------------QR Assist Auto


let apiURL = "http://localhost/cimarrones-emprendedores/BE/";

function statusChange() {
    $('#listaAlumnos').on('click', '#registroAssist', function() {
        const idregistro = $(this).closest('tr').attr('id');
        const assist = $(this).prop('checked') ? 1 : 0;
        console.log(idregistro, assist);
        $.ajax({
            url: `${apiURL}dashboard/status_change.php`,
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
                console.log("Error en la solicitud:", xhr, status, error);
            }
        });
    });
}

function searchUserInWorkshop(userId, workshopId, callback) {
    $.ajax({
        type: "GET",
        url: `${apiURL}dashboard/qr_get_register.php`,
        data: {
            idregistro: userId
        },
        dataType: "json",
        success: function(response) {
            if (response.success && response.data.length > 0) {
                const isCorrectWorkshop = response.data.some(reg => reg.idworkshop == workshopId);
                callback(isCorrectWorkshop);
            } else {
                callback(false);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud al servidor:", error);
            callback(false);
        }
    });
}


function searchToDatabase() {
    $.ajax({
        type: "GET",
        url: `${apiURL}dashboard/get_register.php`,
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

function searchUser() {
    let idUabc = $('#txtId').val();

    $.ajax({
        type: "POST",
        url: `${apiURL}register/get_register.php`,
        data: { id: idUabc },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                $('#name').val(response.nombre);
                $('#lastname').val(response.apellidoP);
                $('#middlename').val(response.apellidoM);
                $('#txtEmail').val(response.email);
                $(".success-search").text("Usuario encontrado.").stop(true, true).slideDown(300, function() {
                    $(this).delay(1000).slideUp(100, function() {
                    });
                });
            } else {
                $(".error-search").text("Usuario no encontrado.").stop(true, true).slideDown(300, function() {
                    $(this).delay(1000).slideUp(100, function() {
                    });
                });
                // console.log("alert-error", response.error);
            }
        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log("alert-error", "Error en la solicitud al servidor.");
        }
    });
}

function updateRegisterList(register) {
    const listaTalleres = $('#listaAlumnos');
    listaTalleres.empty();
    register.forEach(function(registro) {
        // console.log(registro);
        $('#listaAlumnos').append(`
            <tr id="${registro.idregistro}">
                <td>${registro.idregistro}</td>
                <td>${registro.name}</td>
                <td>${registro.lastname} ${registro.middlename}</td>
                <td>${registro.email}</td>
                <td>${registro.type}</td>
                <td>${registro.nameworkshop}</td>
                <td>${registro.campus}</td>
                <td>${registro.date}</td>
                <td>
                    <input id="registroAssist" type="checkbox" ${registro.assist === 1 ? 'checked' : ''}>
                    <span class="assist-text">${registro.assist === 1 ? 'Presente' : 'Ausente'}</span>
                </td>
                <td>
                    <form id="options">
                        <button type="button" title="Eliminar" class="btn-class btnDetails" data-id="${registro.idregistro}" id="deleteButton"><i class="fa-solid fa-trash"></i></button>
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
    $('#listaAlumnos').on('change', '#registroAssist', function() {
        const isChecked = $(this).is(':checked');
        const assistText = isChecked ? 'Presente' : 'Ausente';
        $(this).siblings('.assist-text').text(assistText);
        const idregistro = $(this).closest('tr').attr('id');
        $.ajax({
            url: `${apiURL}dashboard/status_change.php`,
            type: 'POST',
            dataType: "json",
            data: {
                idregistro: idregistro,
                assist: isChecked ? 1 : 0,
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

function getWorkshopsForQr(){
    $.ajax({
        type: "GET",
        url: `${apiURL}dashboard/get_workshop.php`,
        dataType: "json",
        success: function(response) {
            console.log(response);
            var selectTaller = $("#selectedWorkshop");
            selectTaller.empty();
            if (response && response.success && response.data && response.data.length > 0 && (response.data.filter(workshop => workshop.status == 1).length)) {
                selectTaller.append("<option value=''></option>");
                response.data.forEach(taller => {
                    if (taller.status === 1) {
                        selectTaller.append(`<option value='${taller.idworkshop}'>${taller.nameworkshop}</option>`);
                    }
                });
            } else {
                selectTaller.append("<option disabled>No hay talleres disponibles.</option>");
            }
        },
        error: function(xhr, status, error) {
            selectTaller.empty().append("<option disabled>Error al cargar talleres.</option>");
            console.error("Error al obtener los talleres:", error);
        }
    });
}

function getWorkshops() {
    var selectedUbicacion = $("#campus").val();
    $.ajax({
        type: "GET",
        url: `${apiURL}register/get_workshops.php`,
        data: { ubicacion: selectedUbicacion },
        dataType: "json",
        success: function(response) {
            var selectTaller = $("#workshop");
            selectTaller.empty();
            
            if (response && response.success && response.talleres && response.talleres.length > 0) {
                selectTaller.append("<option value=''></option>");
                response.talleres.forEach(taller => {
                    if (taller.status === 1) {
                        selectTaller.append(`<option value='${taller.idworkshop}'>${taller.nombre}</option>`);
                    }
                });
            } else {
                selectTaller.append("<option disabled>No hay talleres disponibles.</option>");
            }
        },
        error: function(xhr, status, error) {
            var selectTaller = $("#workshop");
            selectTaller.empty();
            selectTaller.append("<option disabled>Error al cargar talleres.</option>");
            console.error("Error al obtener los talleres:", error);
        }
    });
}

function addRegistration(modalSelected) {
    var $modalBody = $(modalSelected);

    var iduabc = $modalBody.find('#txtId').val();
    var name = $modalBody.find('#name').val();
    var lastname = $modalBody.find('#lastname').val();
    var middlename = $modalBody.find('#middlename').val();
    var email = $modalBody.find('#txtEmail').val();
    var type = $modalBody.find('#type').val();
    var workshopId = $modalBody.find('#workshop').val();
    var campus = $modalBody.find('#campus').val();
    var assist = $modalBody.find('#status').val();
    // console.log(iduabc,name,lastname,middlename,type,workshopId,campus,assist, email);

    $.ajax({
        url: `${apiURL}dashboard/save_register.php`,
        type: 'POST',
        dataType: "json",
        data: {
            iduabc: iduabc,
            nombre: name,
            apellidoP: lastname,
            apellidoM: middlename,
            email: email,
            option: type,
            idworkshop: workshopId,
            idcampus: campus,
            assist: assist
        },
        success: function(response) {
            if (response.success) {
                setTimeout(function() {
                    location.reload();
                });
            } else {
                console.log("alert-error", `Error al agregar el registro: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${xhr, status, error}`);
        }
    });
}

function registrationTable(modalBodyId) {
    const modalBody = document.getElementById(modalBodyId);
    
    if (!modalBody) {
        console.error(`El elemento con el ID "${modalBodyId}" no se encontró.`);
        return;
    }
    
    modalBody.innerHTML = '';
    const newHTML = `
        <div class="input-general input-group center-item">
            <div class="input-container">
                <input type="text" name="idUabc" id="txtId" required required data-error-message="¡Campo requerido!">
                <label for="txtId">ID</label>
                <button id="btnSearch" type="button" class="btn-search search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <div class="hide error-search error"></div>
                <div class="hide success-search"></div>
            </div>
        </div>
        <div class="input-general">
            <input type="text" id="name" name="name" required>
            <label for="name">Nombre</label>
        </div>
        <div class="input-general">
            <input type="text" id="lastname" name="lastname" required>
            <label for="lastname">Apellido Paterno</label>
        </div>
        <div class="input-general">
            <input type="text" id="middlename" name="middlename" required>
            <label for="middlename">Apellido Materno</label>
        </div>
        <div class="input-general">
            <input type="text" name="email" id="txtEmail" required data-error-message="¡Campo requerido!">
            <label>Correo Electrónico</label>
        </div>
        <div class="input-general">
            <select id="type" name="type" required>
                <option value=""></option>
                <option value="In situ" selected>In situ</option>
                <option value="Alumno">Alumno</option>
                <option value="Docente">Docente</option>
                <option value="Egresado">Egresado</option>
                <option value="Exterior">Exterior</option>
            </select>
            <label for="type">Tipo</label>
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
            <select name="workshop" id="workshop" required>
            <option disabled>No hay talleres disponibles.</option>
            </select>
            <label for="workshop">Taller</label>
        </div>
        <div class="input-general">
            <select name="status" id="status" required>
                <option value="1" selected>Presente</option>
                <option value="0">Ausente</option>
            </select>
            <label for="status">Asistencia</label>
        </div>
    `;

    modalBody.innerHTML = newHTML;

    $('#campus').on('change', function() {
        const campusId = $(this).val();
        if (campusId) {
            getWorkshops();
        } else {
            $("#workshop").empty().append("<option disabled>No hay talleres disponibles.</option>").prop('disabled', true);
        }
    });
}

// Función para eliminar un taller
function deleteReg(selectedIdReg) {
    if (!selectedIdReg) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    $.ajax({
        url: `${apiURL}dashboard/delete_register.php`,
        type: 'POST',
        dataType: "json",
        data: {
            idregistro: selectedIdReg,
        },
        success: function(response) {
            if (response.success) {
                $('#deleteModal').modal('hide');
                location.reload();
                // console.log("alert-success", `Registro eliminado con éxito: ${response.message}`);
            } else {
                console.log("alert-error", `Error al eliminar el registro: ${response.error}`);
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", `Error en la solicitud: ${error}`);
        }
    });
}


function init() {
    searchToDatabase();
    statusChange();
    initQrScanner();
    $(document).on('click', '.btn-class', function(event) {
        const action = event.currentTarget.id;
        const selectedIdReg = $(event.currentTarget).data('id');
        switch (action) {
            case 'addButton':
                $('#addModal').modal('show');
                registrationTable('addModalBody');
                $('#addModalConfirm').off('click').on('click', function() {
                    addRegistration('#addModalBody');
                });
                $('#addModalClose').off('click').on('click', function() {
                    $('#addModal').modal('hide');
                });
                $('.search').click(searchUser);
                break;
            case 'scanQRCode':
                $('#qrModal').modal('show');
                $('#qrModalClose').on('click', function() {
                    $('#qrModal').modal('hide');
                });
                getWorkshopsForQr();
                break;
            case 'deleteButton':
                $('#deleteModal').modal('show');
                $('#deleteModalClose').off('click').on('click', function() {
                    $('#deleteModal').modal('hide');
                });
                $('#deleteConfirm').off('click').on('click', function() {
                    deleteReg(selectedIdReg);
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



/* Otra opcion, donde se quita el scanear cada vez que lee un QR.
//---------------------------------------------------------------------------------------------QR Assist Auto
let html5QrcodeScanner;
let isScannerPaused = false;
function markAttendance(userId) {
    console.log(`Marcando asistencia para el usuario: ${userId}`);
    $.ajax({
        url: `${apiURL}dashboard/status_change.php`,
        type: 'POST',
        dataType: "json",
        data: {
            idregistro: userId,
            assist: 1
        },
        success: function(response) {
            if (response.success) {
                alert('Asistencia marcada con éxito!');
                console.log(`Asistencia marcada para el usuario: ${userId}`);
            } else {
                alert('Error al marcar la asistencia.');
                console.log(`Error al marcar la asistencia: ${response.error}`);
            }
            stopQrScanner();
        },
        error: function(xhr, status, error) {
            console.log("Error en la solicitud:", xhr, status, error);
            alert('Error en la solicitud, intente de nuevo.');
            stopQrScanner();
        }
    });
}

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code scanned = ${decodedText}`, decodedResult);
    const userId = decodedText.startsWith('attendance:') ? decodedText.split(':')[1] : decodedText;
    console.log(`User ID extraído: ${userId}`);
    if (!isScannerPaused) {
        isScannerPaused = true;
        markAttendance(userId);
    }
}

function startQrScanner() {
    if (!html5QrcodeScanner) {
        html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    }
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

function stopQrScanner() {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().then(() => {
            isScannerPaused = false;
            $('#reader').hide();
        }).catch(err => {
            console.error("Error al limpiar el escáner: ", err);
        });
    }
}


function onScanFailure(error) {
    // console.warn(`Code scan error = ${error}`);
}

function initQrScanner() {
    $('#startQrScanner').on('click', function() {
        $('#reader').show();
        startQrScanner();
    });

    $('#qrModal').on('hidden.bs.modal', function() {
        stopQrScanner();
    });
}
//---------------------------------------------------------------------------------------------QR Assist Auto


let apiURL = "http://localhost/cimarrones-emprendedores/BE/";

function statusChange() {
    $('#listaAlumnos').on('click', '#registroAssist', function() {
        const idregistro = $(this).closest('tr').attr('id');
        const assist = $(this).prop('checked') ? 1 : 0;
        console.log(idregistro, assist);
        $.ajax({
            url: `${apiURL}dashboard/status_change.php`,
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
                console.log("Error en la solicitud:", xhr, status, error);
            }
        });
    });
}

function searchToDatabase() {
    $.ajax({
        type: "GET",
        url: `${apiURL}dashboard/get_register.php`,
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

function updateRegisterList(register) {
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
                    <span class="assist-text">${registro.assist === 1 ? 'Presente' : 'Ausente'}</span>
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
    $('#listaAlumnos').on('change', '#registroAssist', function() {
        const isChecked = $(this).is(':checked');
        const assistText = isChecked ? 'Presente' : 'Ausente';
        $(this).siblings('.assist-text').text(assistText);
        const idregistro = $(this).closest('tr').attr('id');
        $.ajax({
            url: `${apiURL}dashboard/status_change.php`,
            type: 'POST',
            dataType: "json",
            data: {
                idregistro: idregistro,
                assist: isChecked ? 1 : 0,
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

function init() {
    searchToDatabase();
    statusChange();
    initQrScanner();
    $(document).on('click', '.btn-class', function(event) {
        const action = event.currentTarget.id;
        switch (action) {
            case 'addButton':
                $('#addModal').modal('show');
                $('#addModalClose').on('click', function() {
                    $('#addModal').modal('hide');
                });
                break;
            case 'scanQRCode':
                $('#qrModal').modal('show');
                $('#qrModalClose').on('click', function() {
                    $('#qrModal').modal('hide');
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

*/
