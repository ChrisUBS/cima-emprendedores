function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}

let apiURL = "http://localhost:3000/cimarrones-emprendedores/BE/";
function searchToDatabase() {
    $.ajax({
        type: "GET", // Cambiar de POST a GET
        url: `${apiURL}registerAdmin/get_table.php`,
        // data: { id: $('#searchBar').val() }, // Cambiar de $('#txtId').val() a $('#searchBar').val()
        dataType: "json",
        success: function(response) {
            console.log(response);
            // if (response.success) {
            //     $('#listaAlumnos').empty();
                
            //     response.data.forEach(function(registro) {
            //         $('#listaAlumnos').append(`
            //             <tr>
            //                 <td>${registro.iduabc}</td>
            //                 <td>${registro.type}</td>
            //                 <td>${registro.taller}</td>
            //                 <td>${registro.fecha_registro}</td>
            //                 <td>${registro.assist}</td>
            //             </tr>
            //         `);
            //     });
            // } else {
            //     var errorMessage = "Error en la respuesta del servidor.";
            //     if (response.error) {
            //         errorMessage = response.error;
            //     }
            //     notifications("alert-error", errorMessage);
            // }
        },
        error: function(xhr, status, error) {
            notifications("alert-error", "Error en la solicitud al servidor.");
        }
    });
}


function init() {
    searchToDatabase();

    $('#searchForm').on('submit', function(event) {
        event.preventDefault();
        searchToDatabase();
    });
}

$(document).ready(function() {
    init();
});
