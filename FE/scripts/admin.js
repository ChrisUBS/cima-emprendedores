let apiURL="http://localhost/cimarronesEmprendedores/BE/"

function searchToDatabase(){
    $('#table tbody').append(`
    <tr>
        <td>"matricula 1"</td>
        <td>"tipo 1"</td>
        <td>"taller 1"</td>
        <td>"fecha 1"</td>
        <td>"check"</td>
    </tr>
`);
    let idUabc = $('#txtId').val();

    $.ajax({
        type: "POST",
        url: `${apiURL}registerAdmin/get_register.php`,
        data: { id: idUabc },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                response.data.forEach(function(registro) {
                    $('#table tbody').append(`
                        <tr>
                            <td>${registro.iduabc}</td>
                            <td>${registro.type}</td>
                            <td>${registro.taller}</td>
                            <td>"To be implemented"</td>
                            <td>"To be implemented"</td>
                        </tr>
                    `);
                });
            } else {
                notifications("alert-error", response.error);
            }
        },
        error: function(xhr, status, error) {
            notifications("alert-error", "Error en la solicitud al servidor.");
        }
    });
}



//main
function init() {
    searchToDatabase(); // Ejecutar al cargar la página

    $('#searchForm').on('submit', function(event) {
        event.preventDefault(); // Prevenir que la página se recargue al enviar el formulario
        searchToDatabase();
    });
}

$(document).ready(function () {
    init();
    
});
