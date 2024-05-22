// REGISTROS JS.
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
            url: 'http://localhost/cimarrones-emprendedores/FE/plugins/es-ES.json'
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
            {
                extend: 'copy',
            },
            {
                extend: 'csv',
            },
            {
                extend: 'excel',
            },
            {
                extend: 'pdf',
            },
            {
                extend: 'print',
            }
        ],
        responsive: true,
        scrollY: "400px",
        scrollCollapse: true
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
        $(window).on('resize', function() {
        table.columns.adjust();
    });
}

function init() {
    searchToDatabase();
    statusChange();
    $(window).on('resize', function() {
        table.columns.adjust();
        });
}

$(document).ready(function() {
    init();
});
