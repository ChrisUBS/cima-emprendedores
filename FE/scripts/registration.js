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
    // console.log(`Code scanned = ${decodedText}`, decodedResult);
    const userId = decodedText.startsWith('attendance:') ? decodedText.split(':')[1] : decodedText;
    // console.log(`User ID extraído: ${userId}`);
    if (!isScannerPaused) {
        isScannerPaused = true;
        markAttendance(userId);
        setTimeout(() => { isScannerPaused = false; }, 2000);
    }
}

function onScanFailure(error) {
    // console.warn(`Code scan error = ${error}`);
}

function startQrScanner() {
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
