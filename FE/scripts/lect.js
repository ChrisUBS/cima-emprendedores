//REGISTROS JS.

let apiURL = "http://localhost/cimarrones-emprendedores/BE/";

function searchToDatabase() {
    $.ajax({
        type: "GET",
        url: `${apiURL}dashboard/get_lect.php`,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                console.log(response.lect);
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


function init() {
    searchToDatabase();
}

$(document).ready(function() {
    init();
});
