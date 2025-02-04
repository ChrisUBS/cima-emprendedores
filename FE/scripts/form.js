let apiURL = "http://localhost/cimarrones-emprendedores/BE/"
// Vaciar al cambio de campos.
function OriginalVal() {
    let ubicacionOriginal = $("#ubicacion").html();
    let facultadOriginal = $("#facultad").html();
    let licOriginal = $("#lic").html();
    let tallerOriginal = $("#taller").html();
    $("#ubicacion").html(ubicacionOriginal);
    $("#facultad").html(facultadOriginal);
    $("#lic").html(licOriginal);
    $("#taller").html(tallerOriginal);
}

function hideNotifications() {
    $(".error").stop(true, true).slideUp(0);
    $(".success").stop(true, true).slideUp(0);
    $(".success-search").stop(true, true).slideUp(0);
    $(".error-search").stop(true, true).slideUp(0);
}

//Validacion de todos los campos.
function isValid(person, phase) {

    let validation = true;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function markEmptyFields() {
        $(".input-general input, .input-general select").each(function () {
            if ($(this).val() === "" || $(this).val() === null || $(this).val() === undefined) {
                $(this).css("border-color", "red");
                let errorMessage = $(this).data("error-message");
                let errorField = $(this).siblings('.error');
                errorField.stop(true, true).slideUp(0);
                errorField.text(errorMessage).stop(true, true).slideDown(300);
                setTimeout(function() {
                    errorField.stop(true, true).slideUp(100);
                }, 1000);
            } else {
                $(this).css("border-color", "");
                $(this).siblings('.error').text("").hide();
            }
        });
    }

    // Validación de los primeros campos disponibles
    if (phase === "initial") {
        if (person.nombre === "" || person.nombre === null || person.nombre === undefined ||
            person.apellidoP === "" || person.apellidoP === null || person.apellidoP === undefined ||
            person.apellidoM === "" || person.apellidoM === null || person.apellidoM === undefined ||
            person.email === "" || person.email === null || person.email === undefined ||
            person.idUabc === "" || person.idUabc === null || person.idUabc === undefined) {
            validation = false;
            markEmptyFields();
            console.log(person)
        }
    }

    // Validación de la segunda fase, cuando los otros campos están disponibles
    if (phase === "complete") {
        if (person.ubicacion === "" || person.ubicacion === null || person.ubicacion === undefined ||
            person.taller === "" || person.taller === null || person.taller === undefined ||
            person.facultad === "" || person.facultad === null || person.facultad === undefined ||
            person.lic === "" || person.lic === null || person.lic === undefined) {
            validation = false;
            markEmptyFields();
        }
    }

    function markEmailError(message) {
        let emailField = $("#txtEmail");
        emailField.css("border-color", "red");
        let errorField = emailField.siblings('.error');
        errorField.text(message).stop(true, true).slideDown(300);
        setTimeout(function() {
            errorField.stop(true, true).slideUp(100);
        }, 1000);
    }

    // Validar formato de correo electrónico
    if (person.email && !emailRegex.test(person.email)) {
        validation = false;
        markEmailError("Ingrese un correo electrónico válido.");
    }


    if (!validation) {
        setTimeout(function () {
            $(".input-general input").css("border-color", "initial");
            $("#txtCampus").css("border-color", "initial");
            $("#txtFacultad").css("border-color", "initial");
            $("#txtLic").css("border-color", "initial");
            $("#txtTaller").css("border-color", "initial");
        }, 1000);
    }

    return validation;
}

//Validacion del boton registro.
function validRegister(newPerson, selectedOption) {
    changeForm(selectedOption);
    $("#btnRegister").off('click').on('click', function () {
        checkExtra(newPerson, selectedOption);
        console.log(newPerson);
        if (isValid(newPerson, "complete")) {
            $("#btnRegister, #btnEdit").fadeOut(300);
            insertToDatabase(newPerson);
            console.log(newPerson);
            // console.log("listo");
        }else {
            $("#btnRegister, #btnEdit").fadeIn(300);
            $(".success").text("¡Registro Fallido o Slots insuficientes!").css("color", "red").stop(true, true).slideDown(300).delay(1000).slideUp(300);
            // console.log("alert-error", "¡Campo requerido ó no valido!");
        }
    });
}

//Segunda parte del formulario registro.
function checkExtra(newPerson, selectedOption) {
    newPerson.ubicacion = $("#txtCampus").val();
    newPerson.taller = $("#txtTaller").val();

    if (selectedOption === "option1") {
        newPerson.facultad = $("#txtFacultad").val();
        newPerson.lic = $("#txtLic").val();
    } else if (selectedOption === "option2") {
        newPerson.facultad = $("#txtFacultad").val();
    }
}

//Registro inicial.
function register() {
    let selectedOption = $("#txtOption").val();
    let newPerson = {};

    newPerson.nombre = $("input[name='nombre']").val();
    newPerson.apellidoP = $("input[name='apellidoP']").val();
    newPerson.apellidoM = $("input[name='apellidoM']").val();
    newPerson.email = $("input[name='email']").val();
    newPerson.option = {
        "option1": "Alumno",
        "option2": "Docente",
        "option3": "Egresado",
        "option4": "Exterior"
    }[selectedOption];

    switch (selectedOption) {
        case "option1":
        case "option2":
            newPerson.idUabc = $("input[name='idUabc']").val();
            break;
    }
    console.log(newPerson);
    if (isValid(newPerson, "initial")) {
        // Si la validación es exitosa, procede con el registro
        validRegister(newPerson, selectedOption);
    } else {
        console.log("¡Campo requerido o no válido!");
    }
}


//Cambios en el formulario registro (dependiendo el evento y/o opciones).
function changeForm(selectedOption) {
    $('#txtFacultad').empty().prop('disabled', true);
    $('#txtLic').empty().prop('disabled', true);
    $('#txtTaller').append("<option disabled>No hay talleres disponibles.</option>");
    

    switch (selectedOption) {
        case "option1":
            $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail, #btnSearch').prop('disabled', true);
            $("#btnNext").hide();
            $("#btnRegister").show();
            $("#ubicacion").show();
            $("#facultad").show();
            $("#lic").show();
            $("#taller").show();
            $("#btnEdit").show();
            $("#ubicacion select").change(function () {
                getFacultad();
                getTalleres();
                $('#txtLic').empty().prop('disabled', true);
            });
            $("#facultad select").change(getLic);
            $("#btnEdit").off('click').on('click', function () {
                hideNotifications();
                $("#ubicacion, #facultad, #lic, #taller").hide();
                OriginalVal();
                $("#btnRegister, #btnEdit").hide();
                $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail, #btnSearch').prop('disabled', false);
                $("#btnNext").show();
            });
            $("#txtOption").change(function () {
                $("#ubicacion, #facultad, #lic, #taller").hide();
                OriginalVal();
                $("#btnRegister, #btnEdit").hide();
                $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail, #btnSearch').prop('disabled', false);
                if ($(this).val() === "") {
                    $("#btnNext").hide();
                } else {
                    $("#btnNext").show();
                }
            });
            break;
        case "option2":
            $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail, #btnSearch').prop('disabled', true);
            $("#btnNext").hide();
            $("#btnRegister").show();
            $("#ubicacion").show();
            $("#facultad").show();
            $("#taller").show();
            $("#btnEdit").show();
            $("#ubicacion select").change(function () {
                getFacultad();
                getTalleres();
            });
            $("#btnEdit").off('click').on('click', function () {
                hideNotifications();
                $("#ubicacion, #facultad, #taller").hide();
                OriginalVal();
                $("#btnRegister, #btnEdit").hide();
                $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail, #btnSearch').prop('disabled', false);
                $("#btnNext").show();
            });
            $("#txtOption").change(function () {
                $("#ubicacion, #facultad, #taller").hide();
                OriginalVal();
                $("#btnRegister, #btnEdit").hide();
                $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail, #btnSearch').prop('disabled', false);
                if ($(this).val() === "") {
                    $("#btnNext").hide();
                } else {
                    $("#btnNext").show();
                }
            });
            break;
        case "option3":
        case "option4":
            $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail, #btnSearch').prop('disabled', true);
            $("#btnNext").hide();
            $("#btnRegister").show();
            $("#ubicacion").show();
            $("#taller").show();
            $("#btnEdit").show();
            $("#ubicacion select").change(getTalleres);
            $("#btnEdit").off('click').on('click', function () {
                hideNotifications();
                $("#ubicacion, #taller").hide();
                OriginalVal();
                $("#btnRegister, #btnEdit").hide();
                $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail, #btnSearch').prop('disabled', false);
                $("#btnNext").show();
            });
            $("#txtOption").change(function () {
                $("#ubicacion, #taller").hide();
                OriginalVal();
                $("#btnRegister, #btnEdit").hide();
                $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail, #btnSearch').prop('disabled', false);
                if ($(this).val() === "") {
                    $("#btnNext").hide();
                } else {
                    $("#btnNext").show();
                }
            });
            break;
    }
}

//Facultades
function getFacultad() {
    var selectedUbicacion = $("#txtCampus").val();
    $.ajax({
        type: "GET",
        url: `${apiURL}register/get_faculty.php`,
        data: { ubicacion: selectedUbicacion },
        success: function (response) {
            var selectFacultad = $("#txtFacultad");
            
            selectFacultad.empty();

            if (response && response.facultades && response.facultades.length > 0) {
                $('#txtFacultad').prop('disabled', false);
                selectFacultad.append("<option value=''></option>");
                response.facultades.forEach(facultad => {
                    selectFacultad.append(`<option value='${facultad.idfacultad}'>${facultad.nombre}</option>`);
                });
            } else {
                $('#txtFacultad').prop('disabled', true);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al obtener las facultades:", error);
        }
    });
}

//Obtener licenciaturas.
function getLic() {
    var selectedFacultad = $("#txtFacultad").val();
    $.ajax({
        type: "GET",
        url: `${apiURL}register/get_lic.php`,
        data: { idfacultad: selectedFacultad },
        success: function (response) {
            var selectLicenciatura = $("#txtLic");
            
            selectLicenciatura.empty();

            if (response && response.licenciaturas && response.licenciaturas.length > 0) {
                $('#txtLic').prop('disabled', false);
                selectLicenciatura.append("<option value=''></option>");
                response.licenciaturas.forEach(licenciatura => {
                    selectLicenciatura.append(`<option value='${licenciatura.idlic}'>${licenciatura.nombre}</option>`);
                });
            } else {
                $('#txtLic').prop('disabled', true);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al obtener las licenciaturas:", error);
        }
    });
}

//Talleres
function getTalleres() {
    var selectedUbicacion = $("#txtCampus").val();
    $.ajax({
        type: "GET",
        url: `${apiURL}register/get_workshops.php`,
        data: { ubicacion: selectedUbicacion },
        success: function(response) {
            var selectTaller = $("#txtTaller");
            selectTaller.empty();
            
            if (response && response.success && response.talleres && response.talleres.length > 0) {
                selectTaller.append("<option value=''></option>");
                response.talleres.forEach(taller => {
                    if (taller.status === 1) {
                        selectTaller.append(`<option value='${taller.idworkshop}'>${taller.nombre}</option>`);
                    }else{
                        selectTaller.append("<option disabled>No hay talleres disponibles.</option>");
                    }
                });
            } else {
                selectTaller.append("<option disabled>No hay talleres disponibles.</option>");
            }
        },
        error: function(xhr, status, error) {
            var selectTaller = $("#txtTaller");
            selectTaller.empty();
            selectTaller.append("<option disabled>Error al cargar talleres.</option>");
            console.error("Error al obtener los talleres:", error);
        }
    });
}

function getInfoModal(selectedIdWorkshop) {
    if (!selectedIdWorkshop) {
        console.log("alert-error", "Error: ID de taller no seleccionado.");
        return;
    }
    $.ajax({
        url: `${apiURL}dashboard/info_workshop.php`,
        type: 'GET',
        dataType: "json",
        data: {
            idworkshop: selectedIdWorkshop,
        },
        
        success: function(response) {
            if (response.success) {
                $('#infoModalBody').empty();
                    response.data.forEach(function(infoworkshop) {
                        $('#infoModalBody').append(`
                        <div class="workshop-info">
                            <h3 class="workshop-title">${infoworkshop.nameworkshop}</h3>
                            <div class="workshop-details">
                                <p><strong>Campus:</strong> ${infoworkshop.campus}</p>
                                <p><strong>Lugar:</strong> ${infoworkshop.place}</p>
                                <p><strong>Fecha:</strong> ${infoworkshop.date}</p>
                                <p><strong>Hora:</strong> ${infoworkshop.time} - ${infoworkshop.timeend}</p>
                                <p><strong>Descripción:</strong> ${infoworkshop.descriptionworkshop}</p>
                                <p><strong>Conferencista:</strong> ${infoworkshop.lecturer}</p>
                                <p><strong>Habilidades requeridas:</strong> ${infoworkshop.ability || 'N/A'}</p>
                                <p><strong>Requerimientos:</strong> ${infoworkshop.requirements || 'N/A'}</p>
                                <p><strong>Cupos:</strong> ${infoworkshop.occupied_slots}/${infoworkshop.slot}</p>
                            </div>
                        </div>
                    `);
                });
                $('#infoModal').modal('show');
            } else {
                console.log("alert-error","Error al mostrar info del taller: ${response.error}");
            }
        },
        error: function(xhr, status, error) {
            console.log("alert-error", "Error en la solicitud: ${error}");
        }
    });
}


//Provisional | base de dato y envio email.
function insertToDatabase(newPerson) {
    $.ajax({
        url: `${apiURL}register/save_register.php`,
        method: 'POST',
        data: {
            id: newPerson.idUabc,
            idfacultad: newPerson.facultad,
            nombre: newPerson.nombre,
            apellidoP: newPerson.apellidoP,
            apellidoM: newPerson.apellidoM,
            email: newPerson.email,
            option: newPerson.option,
            idlic: newPerson.lic,
            idcampus: newPerson.ubicacion,
            idworkshop: newPerson.taller
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                $("#form").hide();
                $("#optionId").hide();
                $("#inputGeneral").hide();
                $("#ubicacion").hide();
                $("#facultad").hide();
                $("#lic").hide();
                $("#taller").hide();
                $("#btnNext").hide();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $("#infoButton").hide();
                $("#finish").show();
                setTimeout(function () {
                    location.reload();
                }, 3000);
            } else {
                $("#btnRegister, #btnEdit").fadeIn(300);
                $("#infoButton").hide();
                $(".success").text("¡Registro Fallido!").css("color", "red").stop(true, true).slideDown(300).delay(1000).slideUp(300);
                console.log("alert-error", response.message || "¡Error! Por favor, inténtalo de nuevo.");
            }
        },
        error: function (xhr, status, error) {
            $(".success").text("¡Registro Fallido!").css("color", "red").stop(true, true).slideDown(300).delay(1000).slideUp(300);
            $("#btnRegister, #btnEdit").fadeIn(300);
            console.error(error, xhr, status);
            console.log("alert-error", "¡Error!. Por favor, inténtalo de nuevo.");
        }
    });
}

function searchToDatabase() {
    let idUabc = $('#txtId').val();

    $.ajax({
        type: "POST",
        url: `${apiURL}register/get_register.php`,
        data: { id: idUabc },
        dataType: "json",
        success: function (response) {
            if (response.success) {
                $('#txtNombre').val(response.nombre);
                $('#txtApellidoP').val(response.apellidoP);
                $('#txtApellidoM').val(response.apellidoM);
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
        error: function (xhr, status, error) {
            console.error(error);
            // console.log("alert-error", "Error en la solicitud al servidor.");
        }
    });
}

function updateInfoButton() {
    let selectedTaller = $("#txtTaller").val();
    if(selectedTaller){
        // console.log("A");
        $("#infoButton").show();
        $("#infoButton").data("id", selectedTaller);
    }else{
        // console.log("B");
        $("#infoButton").hide();
    }
}

//main
function init() {

    //-------- Timer to buttons --------
    $("#btnSearch").click(function() {
        var button = $("#btnNext");
        button.prop('disabled', true);
        setTimeout(function() {
            button.prop('disabled', false);
        }, 1000);
    });
    $("button").click(function() {
        var button = $(this);
        button.prop('disabled', true);
        setTimeout(function() {
            button.prop('disabled', false);
        }, 1000);
    });
    //----------------------------------
    
    $("#form").show();
    $("#optionId").hide();
    $("#inputGeneral").hide();
    $("#ubicacion").hide();
    $("#facultad").hide();
    $("#lic").hide();
    $("#taller").hide();
    $("#btnNext").hide();
    $("#btnRegister").hide();
    $("#btnEdit").hide();
    $("#infoButton").hide();
    $("#finish").hide();

    // Hook eventos
    $("#txtOption").change(function () {
        var selectedOption = $(this).val();

        $('#txtNombre').val('');
        $('#txtApellidoP').val('');
        $('#txtApellidoM').val('');
        $('#txtEmail').val('');

        $("#inputGeneral").show();

        if (selectedOption === "option1") {
            $('.search').click(searchToDatabase)
            $('#txtId').siblings('label').text("Matricula");
            $("#optionId").show();
            $("#btnNext").show();
        } else if (selectedOption === "option2") {
            $('.search').click(searchToDatabase)
            $('#txtId').siblings('label').text("No. Empleado");
            $('#optionId').show();
            $("#btnNext").show();
        } else if (selectedOption === "option3" || selectedOption === "option4") {
            $("#btnNext").show();
            $("#optionId").hide();
        } else {
            $("#btnNext").hide();
            $("#optionId").hide();
            $("#inputGeneral").hide();
        }
    });
    $("#btnNext").click(register);

    //--------------- Modal Info Workshop ----------------
    
    $("#infoButton").click(function() {
        var idWorkshop = $(this).data("id");
        if (idWorkshop) {
            getInfoModal(idWorkshop);
        } else {
            console.log("No workshop ID.");
        }
    });
    $("#ubicacion").change(function(){
        $("#infoButton").hide();
    });
    $("#txtTaller").change(function(){
        updateInfoButton();
    });
    $('#infoModalClose').off('click').on('click', function() {
        $('#infoModal').modal('hide');
    });

    //-----------------------------------------------------
}

$(document).ready(function () {
    init();
});