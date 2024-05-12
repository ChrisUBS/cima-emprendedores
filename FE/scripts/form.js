var people = [];

class Person {
    constructor(idUabc, name, lastName, middleName, email, ubicacion, facultad, lic, taller) {
        this.name = name;
        this.lastName = lastName;
        this.middleName = middleName;
        this.email = email;
        this.idUabc = idUabc;
        this.ubicacion = ubicacion;
        this.facultad = facultad;
        this.lic = lic;
        this.taller = taller;
    }
}



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
function isValid(person, selectedOption) {
    let validation = true;
    $("#notifications").removeClass("alert-error");
    $("#notifications").removeClass("alert-success");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (person.name === "" || person.lastName === "" || person.middleName === "" || person.email === "" || person.idUabc === "" || person.ubicacion === "" || person.taller === "" || person.lic === "") {
        validation = false;
        $(".input-control input").css("border-color", "initial");
        $(".input-control input").each(function () {
            if ($(this).val() === "") {
                $(this).css("border-color", "red");
            }
        });
        if (person.ubicacion === "") {
            $("#txtCampus").css("border-color", "red");
        }
        if (selectedOption === "option1" || selectedOption === "option2") {
            if (person.facultad === "") {
                $("#txtFacultad").css("border-color", "red");
            }
        }
        if (selectedOption === "option1") {
            if (person.lic === "") {
                $("#txtLic").css("border-color", "red");
            }
        }
        if (person.taller === "") {
            $("#txtTaller").css("border-color", "red");
        }
    }

    if (person.email !== "" && !emailRegex.test(person.email)) {
        validation = false;
        $(".input-control input#txtEmail").css("border-color", "red");
    }

    if (!validation) {
        setTimeout(function () {
            $(".input-control input").css("border-color", "initial");
            $("#txtCampus").css("border-color", "initial");
            $("#txtFacultad").css("border-color", "initial");
            $("#txtLic").css("border-color", "initial");
            $("#txtTaller").css("border-color", "initial");
        }, 1500);
    }
    return validation;
}


//Validacion del boton siguiente.
function validNext(newPerson, selectedOption) {
    if (isValid(newPerson, selectedOption)) {
        validRegister(newPerson, selectedOption);
    } else {
        notifications("alert-error", "¡Campo requerido ó no valido!");
    }
}

//Validacion del boton registro.
function validRegister(newPerson, selectedOption) {
    changeForm(selectedOption);
    switch (selectedOption) {
        case "option1":
            newPerson = { ...newPerson, option: "Alumno" }
            $("#btnRegister").click(function () {
                checkExtra(newPerson, selectedOption);
                if (isValid(newPerson, selectedOption)) {
                    insertToDatabase(newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
        case "option2":
            newPerson = { ...newPerson, option: "Docente" }
            $("#btnRegister").click(function () {
                checkExtra(newPerson, selectedOption);
                if (isValid(newPerson, selectedOption)) {
                    insertToDatabase(newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
        case "option3":
            newPerson = { ...newPerson, option: "Egresado" }
            $("#btnRegister").click(function () {
                checkExtra(newPerson, selectedOption);
                if (isValid(newPerson)) {
                    insertToDatabase(newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
        case "option4":
            newPerson = { ...newPerson, option: "Exterior" }
            $("#btnRegister").click(function () {
                checkExtra(newPerson, selectedOption);
                if (isValid(newPerson)) {
                    insertToDatabase(newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
    }
}

//Seguna parte del formulario registro.
function checkExtra(newPerson, selectedOption) {
    if (selectedOption === "option1") {
        newPerson.ubicacion = $("#txtCampus").val();
        newPerson.facultad = $("#txtFacultad").val();
        newPerson.lic = $("#txtLic").val();
        newPerson.taller = $("#txtTaller").val();
    }
    else if (selectedOption === "option2") {
        newPerson.ubicacion = $("#txtCampus").val();
        newPerson.facultad = $("#txtFacultad").val();
        newPerson.taller = $("#txtTaller").val();
    }
    else if (selectedOption === "option3" || "option4") {
        newPerson.ubicacion = $("#txtCampus").val();
        newPerson.taller = $("#txtTaller").val();
    }
}

//Registro inicial.
function register() {
    // let selectedOption = $("#txtOption").val();
    
    // let newPerson = {
    //     idUabc: $("input[name='idUabc']").val(),
    //     name: $("input[name='nombre']").val(),
    //     lastName: $("input[name='apellidoP']").val(),
    //     middleName: $("input[name='apellidoM']").val(),
    //     email: $("input[name='email']").val(),
    // };

    // if (!isValid(newPerson, selectedOption)) {
    //     notifications("alert-error", "¡Campo requerido o no válido!");
    //     return;
    // }

    // validNext(newPerson, selectedOption);
    let selectedOption = $("#txtOption").val();
    let newPerson = {};

    switch (selectedOption) {
        case "option1":
            newPerson.idUabc = $("input[name='idUabc']").val();
            break;
        case "option2":
            newPerson.idUabc = $("input[name='idUabc']").val();
            break;
        case "option3":
        case "option4":
            break;
    }
    newPerson.nombre = $("input[name='nombre']").val();
    newPerson.apellidoP = $("input[name='apellidoP']").val();
    newPerson.apellidoM = $("input[name='apellidoM']").val();
    newPerson.email = $("input[name='email']").val();
    if (!isValid(newPerson, selectedOption)) {
            notifications("alert-error", "¡Campo requerido o no válido!");
            return;
        }
    validNext(newPerson, selectedOption);
}


//Cambios en el formulario registro (dependiendo el evento y/o opciones).
function changeForm(selectedOption) {
    switch (selectedOption) {
        case "option1":
            $('#txtFacultad').prop('disabled', true);
            $('#txtLic').prop('disabled', true);
            $('#txtTaller').prop('disabled', true);
            $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', true).each(function () {
                $('label[for="' + $(this).attr('id') + '"]').removeClass('animated-label');
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
                    $('label[for="' + $(this).attr('id') + '"]').addClass('animated-label');
                });
                $("#btnNext").show();
                let newPerson = {
                    name: $("input[name='nombre']").val(),
                    lastName: $("input[name='apellidoP']").val(),
                    middleName: $("input[name='apellidoM']").val(),
                    email: $("input[name='email']").val(),
                    idUabc: $("input[name='idUabc']").val(),
                };
                isValid(newPerson, selectedOption);
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
                    $('label[for="' + $(this).attr('id') + '"]').addClass('animated-label');
                });
                if ($(this).val() === "") {
                    $("#btnNext").hide();
                } else {
                    $("#btnNext").show();
                }
                let newPerson = {
                    name: $("input[name='nombre']").val(),
                    lastName: $("input[name='apellidoP']").val(),
                    middleName: $("input[name='apellidoM']").val(),
                    email: $("input[name='email']").val(),
                    idUabc: $("input[name='idUabc']").val(),
                };
                isValid(newPerson, selectedOption);
            });
        case "option2":
            $('#txtFacultad').prop('disabled', true);
            $('#txtTaller').prop('disabled', true);
            $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', true).each(function () {
                $('label[for="' + $(this).attr('id') + '"]').removeClass('animated-label');
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
                    $('label[for="' + $(this).attr('id') + '"]').addClass('animated-label');
                });
                $("#btnNext").show();
                let newPerson = {
                    name: $("input[name='nombre']").val(),
                    lastName: $("input[name='apellidoP']").val(),
                    middleName: $("input[name='apellidoM']").val(),
                    email: $("input[name='email']").val(),
                    idUabc: $("input[name='idUabc']").val(),
                };
                isValid(newPerson, selectedOption);
            });
            $("#txtOption").change(function () {
                $("#ubicacion").hide();
                $("#facultad").hide();
                $("#taller").hide();
                OriginalVal();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $('#txtOption, #txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                    $('label[for="' + $(this).attr('id') + '"]').addClass('animated-label');
                });
                if ($(this).val() === "") {
                    $("#btnNext").hide();
                } else {
                    $("#btnNext").show();
                }
            });
            let newPerson = {
                name: $("input[name='nombre']").val(),
                lastName: $("input[name='apellidoP']").val(),
                middleName: $("input[name='apellidoM']").val(),
                email: $("input[name='email']").val(),
                idUabc: $("input[name='idUabc']").val(),
            };
            isValid(newPerson, selectedOption);
            break;
        case "option3":
        case "option4":
            $('#txtFacultad').prop('disabled', true);
            $('#txtTaller').prop('disabled', true);
            $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', true).each(function () {
                $('label[for="' + $(this).attr('id') + '"]').removeClass('animated-label');
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
                    $('label[for="' + $(this).attr('id') + '"]').addClass('animated-label');
                });
                $("#btnNext").show();
                let newPerson = {
                    name: $("input[name='nombre']").val(),
                    lastName: $("input[name='apellidoP']").val(),
                    middleName: $("input[name='apellidoM']").val(),
                    email: $("input[name='email']").val(),
                    idUabc: $("input[name='idUabc']").val(),
                };
                isValid(newPerson, selectedOption);
            });
            $("#txtOption").change(function () {
                $("#ubicacion").hide();
                $("#taller").hide();
                OriginalVal();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                    $('label[for="' + $(this).attr('id') + '"]').addClass('animated-label');
                });
                if ($(this).val() === "") {
                    $("#btnNext").hide();
                } else {
                    $("#btnNext").show();
                }
                let newPerson = {
                    name: $("input[name='nombre']").val(),
                    lastName: $("input[name='apellidoP']").val(),
                    middleName: $("input[name='apellidoM']").val(),
                    email: $("input[name='email']").val(),
                    idUabc: $("input[name='idUabc']").val(),
                };
                isValid(newPerson, selectedOption);
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

//Animacion de las notificaciones
function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
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
                notifications("alert-success", "Registro Exitoso.");
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                setTimeout(function () {
                    location.reload();
                }, 4500);
            } else {
                notifications("alert-error", response.message || "¡Error! Por favor, inténtalo de nuevo.");
            }
        },
        error: function (xhr, status, error) {
            console.error(error, xhr, status);
            notifications("alert-error", "¡Error!. Por favor, inténtalo de nuevo.");
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
            } else {
                notifications("alert-error", response.error);
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
            notifications("alert-error", "Error en la solicitud al servidor.");
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