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


//Validacion de todos los campos.
function isValid(person) {
    let validation = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function markEmptyFields() {
        $(".input-general input, .input-general select").each(function () {
            if ($(this).val() === "") {
                $(this).css("border-color", "red");
                let errorMessage = $(this).data("error-message");
                let errorField = $(this).siblings('.error');
                errorField.slideUp(0);
                errorField.text(errorMessage).slideDown(300);
                setTimeout(function() {
                    errorField.slideUp(100);
                }, 1000);
            } else {
                $(this).css("border-color", "");
                $(this).siblings('.error').text("").hide();
            }
        });
    }

    // Validar campos vacíos
    if (person.nombre === "" || person.apellidoP === "" || person.apellidoM === "" || person.email === "" || person.idUabc === "" || person.ubicacion === "" || person.taller === "" || person.lic === "") {
        validation = false;
        markEmptyFields();
    }

    // Validar formato de correo electrónico
    if (person.email !== "" && !emailRegex.test(person.email)) {
        validation = false;
        $(".input-general input#txtEmail").css("border-color", "red");
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
    $("#btnRegister").click(function () {
        checkExtra(newPerson, selectedOption);
        if (isValid(newPerson, selectedOption)) {
            insertToDatabase(newPerson);
            // console.log("listo");
        }else {
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

    if (isValid(newPerson)) {
        // Si la validación es exitosa, procede con el registro
        validRegister(newPerson, selectedOption);
    } else {
        console.log("¡Campo requerido o no válido!");
    }
}


//Cambios en el formulario registro (dependiendo el evento y/o opciones).
function changeForm(selectedOption) {
    switch (selectedOption) {
        case "option1":
            $('#txtFacultad').prop('disabled', true);
            $('#txtLic').prop('disabled', true);
            $('#txtTaller').prop('disabled', true);
            $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', true).each(function () {
            });
            $("#btnNext").hide();
            $("#btnRegister").show();
            $("#ubicacion").show();
            $("#facultad").show();
            $("#lic").show();
            $("#taller").show();
            $("#btnEdit").show();
            $("#ubicacion select").change(getFacultad);
            $("#facultad select").change(getLic);
            $("#ubicacion select").change(getTalleres);
            $("#btnEdit").click(function () {
                $("#ubicacion").hide();
                $("#facultad").hide();
                $("#taller").hide();
                $("#lic").hide();
                OriginalVal();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                });
                $("#btnNext").show();
            });
            $("#txtOption").change(function () {
                $("#ubicacion").hide();
                $("#facultad").hide();
                $("#lic").hide();
                $("#taller").hide();
                OriginalVal();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                });
                if ($(this).val() === "") {
                    $("#btnNext").hide();
                } else {
                    $("#btnNext").show();
                }
            });
        case "option2":
            $('#txtFacultad').prop('disabled', true);
            $('#txtTaller').prop('disabled', true);
            $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', true).each(function () {
            });
            $("#btnNext").hide();
            $("#btnRegister").show();
            $("#ubicacion").show();
            $("#facultad").show();
            $("#taller").show();
            $("#btnEdit").show();
            $("#ubicacion select").change(getFacultad);
            $("#ubicacion select").change(getTalleres);
            $("#btnEdit").click(function () {
                $("#ubicacion").hide();
                $("#facultad").hide();
                $("#taller").hide();
                OriginalVal();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                });
                $("#btnNext").show();
            });
            $("#txtOption").change(function () {
                $("#ubicacion").hide();
                $("#facultad").hide();
                $("#taller").hide();
                OriginalVal();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                });
                if ($(this).val() === "") {
                    $("#btnNext").hide();
                } else {
                    $("#btnNext").show();
                }
            });
            break;
        case "option3":
        case "option4":
            $('#txtFacultad').prop('disabled', true);
            $('#txtTaller').prop('disabled', true);
            $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', true).each(function () {
            });
            $("#btnNext").hide();
            $("#btnRegister").show();
            $("#ubicacion").show();
            $("#taller").show();
            $("#btnEdit").show();
            $("#ubicacion select").change(getFacultad);
            $("#ubicacion select").change(getTalleres);
            $("#btnEdit").click(function () {
                $("#ubicacion").hide();
                $("#taller").hide();
                OriginalVal();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                });
                $("#btnNext").show();
            });
            $("#txtOption").change(function () {
                $("#ubicacion").hide();
                $("#taller").hide();
                OriginalVal();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                });
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
                $('#txtTaller').prop('disabled', false);
                selectTaller.append("<option value=''></option>");
                
                response.talleres.forEach(taller => {
                    if (taller.status === 1) {
                        selectTaller.append(`<option value='${taller.idworkshop}'>${taller.nombre}</option>`);
                    }
                });
            } else {
                $('#txtTaller').prop('disabled', true);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener los talleres:", error);
        }
    });
}

let apiURL = "http://localhost/cimarrones-emprendedores/BE/"
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
            $("#btnRegister, #btnEdit").fadeOut(300);
            $(".success").text("¡Registro exitoso!").slideDown(300, function() {
                $(this).delay(1000).slideUp(100, function() {
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                });
            });
            } else {
                console.log("alert-error", response.message || "¡Error! Por favor, inténtalo de nuevo.");
            }
        },
        error: function (xhr, status, error) {
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
                $(".success-search").text("Usuario encontrado.").slideDown(300, function() {
                    $(this).delay(1000).slideUp(100, function() {
                    });
                });
            } else {
                $(".error-search").text("Usuario no encontrado.").slideDown(300, function() {
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

//main
function init() {
    $("#optionId").hide();
    $("#inputGeneral").hide();
    $("#ubicacion").hide();
    $("#facultad").hide();
    $("#lic").hide();
    $("#taller").hide();
    $("#btnNext").hide();
    $("#btnRegister").hide();
    $("#btnEdit").hide();

    $("button").click(function() {
        console.log("btn");
        var button = $(this);
        button.prop('disabled', true);
        setTimeout(function() {
            button.prop('disabled', false);
        }, 2000);
    });

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
}

$(document).ready(function () {
    init();
});