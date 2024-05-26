//REGISTROS JS.

let apiURL = "http://localhost/cimarrones-emprendedores/BE/";

function searchToDatabase() {
    $.ajax({
        type: "GET",
        url: `${apiURL}dashboard/get_feedback.php`,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                updateFeedbackList(response.feedback);
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

function updateFeedbackList(feedback){
    const listaFeedback = $('#listaAlumnos');
    listaFeedback.empty();
    console.log(feedback);
    feedback.forEach(function(feedback) {
        $('#listaAlumnos').append(`
            <tr id="${feedback.idfeedback}">
                <td>${feedback.workshop}</td>
                <td>${feedback.campus}</td>
                <td>${feedback.q1}</td>
                <td>${feedback.q2}</td>
                <td>${feedback.q3}</td>
                <td>${feedback.q4}</td>
                <td>${feedback.q5}</td>
                <td>${feedback.q6}</td>
                <td>${feedback.q7}</td>
                <td>${feedback.q8}</td>
                <td>${feedback.q9}</td>
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
}


function init() {
    searchToDatabase();
}

$(document).ready(function() {
    init();
});
