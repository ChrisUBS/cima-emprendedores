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
        type: "GET", // Cambiar de POST a GET
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
                            <button id="btnInfo" type="button" class="btn-class Info"><i class="fa-solid fa-circle-info"></i></button>
                            <button id="btnEdit" type="button" class="btn-class Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="btnDelete" type="button" class="btn-class Delete" data-post="${talleres.post}"><i class="fa-solid fa-trash"></i></button>
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
    // $("#btnDelete").click(register);
    // $("#btnDelete").click(register);
    $('#searchForm').on('submit', function(event) {
        event.preventDefault();
        searchToDatabase();
    });
    // Escucha el evento de clic en los botones de eliminación
    $(document).on('click', '.btn-class.Delete', function() {
        const post = $(this).attr('data-post');

        // Confirmar eliminación
        const confirmed = confirm('¿Estás seguro de que deseas eliminar este taller?');

        if (confirmed) {
            // Enviar una solicitud POST a delete_workshop.php con el valor post
            $.ajax({
                type: 'POST',
                url: `${apiURL}registerAdmin/delete_workshop.php`,
                data: JSON.stringify({ post: post }),
                contentType: 'application/json',
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        // Taller eliminado con éxito
                        notifications('alert-success', 'Taller eliminado correctamente.');
                        // Recargar datos de la tabla después de eliminar el taller
                        searchToDatabase();
                    } else {
                        // Manejar errores
                        notifications('alert-error', 'No se pudo eliminar el taller: ' + response.error);
                    }
                },
                error: function(xhr, status, error) {
                    // Manejar errores de la solicitud AJAX
                    notifications('alert-error', 'Error al eliminar el taller.');
                    console.error(error);
                }
            });
        }
    });
    // Escucha el evento de clic en los botones de eliminación
    $(document).on('click', '.btn-class.Delete', function() {
        const post = $(this).attr('data-post');

        // Confirmar eliminación
        const confirmed = confirm('¿Estás seguro de que deseas eliminar este taller?');

        if (confirmed) {
            // Enviar una solicitud POST a delete_workshop.php con el valor post
            $.ajax({
                type: 'POST',
                url: `${apiURL}registerAdmin/delete_workshop.php`,
                data: JSON.stringify({ post: post }),
                contentType: 'application/json',
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        // Taller eliminado con éxito
                        notifications('alert-success', 'Taller eliminado correctamente.');
                        // Recargar datos de la tabla después de eliminar el taller
                        searchToDatabase();
                    } else {
                        // Manejar errores
                        notifications('alert-error', 'No se pudo eliminar el taller: ' + response.error);
                    }
                },
                error: function(xhr, status, error) {
                    // Manejar errores de la solicitud AJAX
                    notifications('alert-error', 'Error al eliminar el taller.');
                    console.error(error);
                }
            });
        }
    });
}

$(document).ready(function() {
    init();
});
