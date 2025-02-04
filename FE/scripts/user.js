//REGISTROS JS.

let apiURL = "http://localhost/cimarrones-emprendedores/BE/";

function searchToDatabase() {
    $.ajax({
        type: "GET",
        url: `${apiURL}dashboard/get_user.php`,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                updateUserList(response.data);
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

function updateUserList(user){
    const listaTalleres = $('#listaAlumnos');
    listaTalleres.empty();
    // console.log(user);
    user.forEach(function(user) {
        $('#listaAlumnos').append(`
            <tr id="${user.iduabc}">
                <td>${user.iduabc}</td>
                <td>${user.name}</td>
                <td>${user.lastname} ${user.middlename}</td>
                <td>${user.email}</td>
                <td>${user.type}</td>
                <td id="${user.idcampus}">${user.campus}</td> 
                <td id="${user.idfacultad}">${user.facultad}</td> 
                <td id="${user.idlic}">${user.namelic}</td> 
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
