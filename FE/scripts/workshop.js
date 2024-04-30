function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}

let apiURL = "http://localhost/cimarrones-emprendedores/BE/";

function searchToDatabase() {
    $.ajax({
        type: "GET",
        url: `${apiURL}registerAdmin/get_table_workshop.php`,
        dataType: "json",
        success: function(response) {
            console.log(response);
            if (response.success) {
                $('#listaTalleres').empty();
                response.data.forEach(function(talleres) {
                    $('#listaTalleres').append(`
                        <tr>
                            <td>${talleres.nameworkshop}</td>
                            <td>${talleres.idfacultad}</td>
                            <td>${talleres.campus}</td>
                            <td>${talleres.date}</td>
                            <td>${talleres.time}</td>
                            <td>
                                <button type="button" class="btn-class Info" data-id="${talleres.post}"><i class="fa-solid fa-circle-info"></i></button>
                                <button type="button" class="btn-class Edit" data-id="${talleres.post}"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button type="button" class="btn-class Delete" data-id="${talleres.post}"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    `);
                });
            } else {
                var errorMessage = "Error en la respuesta del servidor.";
                if (response.error) {
                    errorMessage = response.error;
                }
                notifications("alert-error", errorMessage);
            }
        },
        error: function(xhr, status, error) {
            console.log(error);
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

    $(document).on('click', '.Info', function() {
        var id = $(this).data('id');
        // Aquí puedes cargar los datos del taller para mostrarlos en el modal de info
        $('#infoModal').modal('show');
    });

    $(document).on('click', '.Edit', function() {
        var id = $(this).data('id');
        // Aquí puedes cargar los datos del taller para editarlos en el modal de edición
        $('#editModal').modal('show');
    });

    $(document).on('click', '.Delete', function() {
        var id = $(this).data('id');
        // Aquí puedes cargar los datos del taller para eliminarlos en el modal de confirmación
        $('#deleteModal').modal('show');
    });
}

$(document).ready(function() {
    init();
});
