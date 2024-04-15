var people = [];

class Person {
    constructor(idUabc, name, lastName, middleName, email, ubicacion, facultad, taller) {
        this.name = name;
        this.lastName = lastName;
        this.middleName = middleName;
        this.email = email;
        this.matricula = idUabc;
        this.noEmpleado = idUabc;
        this.ubicacion = ubicacion;
        this.facultad = facultad;
        this.taller = taller;
    }
}



function OriginalVal() {
    let ubicacionOriginal = $("#ubicacion").html();
    let facultadOriginal = $("#facultad").html();
    let tallerOriginal = $("#taller").html();
    $("#ubicacion").html(ubicacionOriginal);
    $("#facultad").html(facultadOriginal);
    $("#taller").html(tallerOriginal);
}

//Validacion de todos los campos.
function isValid(person, selectedOption) {
    let validation = true;
    $("#notifications").removeClass("alert-error");
    $("#notifications").removeClass("alert-success");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (person.name === "" || person.lastName === "" || person.middleName === "" || person.email === "" || person.idUabc === "" || person.ubicacion === "" || person.taller === "") {
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
            newPerson={ ...newPerson, option:"Alumno"}
            $("#btnRegister").click(function () {
                checkExtra(newPerson, selectedOption);
                console.log("Valor:", newPerson);
                if (isValid(newPerson, selectedOption)) {
                    insertToDatabase(newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
        case "option2":
            newPerson={ ...newPerson, option:"Docente"}
            $("#btnRegister").click(function () {
                checkExtra(newPerson, selectedOption);
                console.log("Valor:", newPerson);
                if (isValid(newPerson, selectedOption)) {
                    insertToDatabase(newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
        case "option3":
            newPerson={ ...newPerson, option:"Egresado"}
            $("#btnRegister").click(function () {
                checkExtra(newPerson, selectedOption);
                console.log("Valor:", newPerson);
                if (isValid(newPerson)) {
                    
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
        case "option4":
            newPerson={ ...newPerson, option:"Exterior"}
            $("#btnRegister").click(function () {
                checkExtra(newPerson, selectedOption);
                console.log("Valor:", newPerson);
                if (isValid(newPerson)) {
                    
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
    }
}

//Seguna parte del formulario registro.
function checkExtra(newPerson, selectedOption) {
    if (selectedOption === "option1" || "option2") {
        newPerson.ubicacion = $("#txtCampus").val();
        newPerson.facultad = $("#txtFacultad").val();
        newPerson.taller = $("#txtTaller").val();
    } else if (selectedOption === "option3" || "option4") {
        newPerson.ubicacion = $("#txtCampus").val();
        newPerson.taller = $("#txtTaller").val();
    }
}

//Registro inicial.
function register() {
    let selectedOption = $("#txtOption").val();
    let newPerson = {};

    switch (selectedOption) {
        case "option1":
            newPerson.idUabc = $("input[name='matricula']").val();
            break;
        case "option2":
            newPerson.idUabc = $("input[name='noEmpleado']").val();
            break;
        case "option3":
        case "option4":
            break;
    }
    newPerson.nombre = $("input[name='nombre']").val();
    newPerson.apellidoP = $("input[name='apellidoP']").val();
    newPerson.apellidoM = $("input[name='apellidoM']").val();
    newPerson.email = $("input[name='email']").val();
    validNext(newPerson, selectedOption);
}


//Cambios en el formulario registro (dependiendo el evento y/o opciones).
function changeForm(selectedOption) {
    switch (selectedOption) {
        case "option1":
        case "option2":
            $('#txtFacultad').prop('disabled', true);
            $('#txtTaller').prop('disabled', true);
            $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', true).each(function () {
                $('label[for="' + $(this).attr('id') + '"]').removeClass('animated-label');
            });
            $("#btnNext").hide();
            $("#btnRegister").show();
            $("#ubicacion").show();
            $("#facultad").show();
            $("#taller").show();
            $("#btnEdit").show();
            $("#ubicacion select").change(Facultad);
            $("#ubicacion select").change(Talleres);
            $("#btnEdit").click(function () {
                $("#ubicacion").hide();
                $("#facultad").hide();
                $("#taller").hide();
                OriginalVal();
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                    $('label[for="' + $(this).attr('id') + '"]').addClass('animated-label');
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
                $('#txtId, #txtNombre, #txtApellidoP, #txtApellidoM, #txtEmail').prop('disabled', false).each(function () {
                    $('label[for="' + $(this).attr('id') + '"]').addClass('animated-label');
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
                $('label[for="' + $(this).attr('id') + '"]').removeClass('animated-label');
            });
            $("#btnNext").hide();
            $("#btnRegister").show();
            $("#ubicacion").show();
            $("#taller").show();
            $("#btnEdit").show();
            $("#ubicacion select").change(Facultad);
            $("#ubicacion select").change(Talleres);
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
            });
            break;
    }
}

//Facultades
function Facultad() {
    var selectedUbicacion = $("#txtCampus").val();
    const facultadesXUbicacion = {
        "Tijuana": ["Facultad de Artes", "Facultad de Ciencias Químicas e Ingeniería", "Facultad de Contaduría y Administración", "Facultad de Ciencias de la Salud, Valle de las Palmas", "Facultad de Deportes", "Facultad de Derecho", "Facultad de Economía y Relaciones Internacionales", "Facultad de Humanidades y Ciencias Sociales", "Facultad de Idiomas", "Facultad de la Ingeniería y Tecnología", "Facultad de Medicina y Psicología", "Facultad de Odontología", "Facultad de Turismo y Mercadotecnia", "Instituto de Investigaciones Históricas", "Facultad de Ciencias de la Ingeniería, Administrativas y Sociales"],
        "Mexicali": ["Facultad de Artes", "Facultad de Arquitectura y Diseño", "Instituto de Ciencias Agrícolas", "Facultad de Ciencias Sociales y Políticas", "Facultad de Ciencias Humanas", "Facultad de Ciencias Administrativas", "Facultad de Deportes", "Facultad de Derecho", "Facultad de Enfermería", "Facultad de Idiomas", "Facultad de Ingeniería", "Facultad de Ingeniería y Negocios Guadalupe Victoria", "Instituto de Investigaciones en Ciencias Veterinarias", "Instituto de Investigaciones Culturales (IIC Museo)", "Instituto de Investigaciones Sociales", "Instituto de Ingeniería", "Facultad de Medicina", "Facultad de Odontología", "Facultad de Pedagogía e Innovación Educativa"],
        "Ensenada": ["Facultad de Artes", "Escuela de Ciencias de la Salud", "Facultad de Ciencias", "Facultad de Ciencias Administrativas y Sociales", "Facultad de Ciencias Marinas", "Facultad de Deportes", "Facultad de Enología y Gastronomía", "Facultad de Idiomas", "Facultad de Ingeniería y Negocios - San Quintín", "Facultad de Ingeniería, Arquitectura y Diseño", "Instituto de Investigación y Desarrollo Educativo", "Instituto de Investigaciones Oceanológicas"]
    };

    var selectedUbicacion = $("#txtCampus").val();
    const selectFacultad = $("#txtFacultad");

    selectFacultad.empty();

    if (selectedUbicacion) {
        $('#txtFacultad').prop('disabled', false);
        selectFacultad.append("<option value=''></option>");
        const facultades = facultadesXUbicacion[selectedUbicacion];
        facultades.forEach(facultad => {
            selectFacultad.append(`<option value='${facultad}'>${facultad}</option>`);
        });
    } else {
        $('#txtFacultad').prop('disabled', true);
    }
}

//Talleres
function Talleres() {
    var selectedUbicacion = $("#txtCampus").val();
    const talleresXUbicacion = {
        "Tijuana": ["Taller 1", "Taller 2", "Taller 3"],
        "Mexicali": ["Taller A", "Taller B", "Taller C"],
        "Ensenada": ["Taller X", "Taller Y", "Taller Z"]
    };

    var selectedUbicacion = $("#txtCampus").val();
    const selectTaller = $("#txtTaller");

    selectTaller.empty();

    if (selectedUbicacion) {
        $('#txtTaller').prop('disabled', false);
        selectTaller.append("<option value=''></option>");
        const talleres = talleresXUbicacion[selectedUbicacion];
        talleres.forEach(taller => {
            selectTaller.append(`<option value='${taller}'>${taller}</option>`);
        });
    } else {
        $('#txtTaller').prop('disabled', true);
    }
}

//Animacion de las notificaciones
function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}

let apiURL="http://localhost/cimarronesEmprendedores/BE/"
//Provisional | base de dato y envio email.
function insertToDatabase(newPerson) {
    $.ajax({
        url: `${apiURL}register/save_register.php`,
        method: 'POST',
        data: { 
            id: newPerson.idUabc,
            nombre: newPerson.nombre,
            apellidoP: newPerson.apellidoP,
            apellidoM: newPerson.apellidoM,
            email: newPerson.email,
            option: newPerson.option,  
        },
        dataType: 'json', 
        success: function(response) {
            if (response.success) {
                notifications("alert-success", "Registro Exitoso.");
                $("#btnRegister").hide();
                $("#btnEdit").hide();
                setTimeout(function () {
                    location.reload();
                }, 4500);
            } else {
                notifications("alert-error", "¡Error!. Por favor, inténtalo de nuevo.");
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
            notifications("alert-error", "¡Error!. Por favor, inténtalo de nuevo.");
        }
    });
}

function searchToDatabase(){
    let idUabc = $('#txtId').val();

    $.ajax({
        type: "POST",
        url: `${apiURL}register/get_register.php`,
        data: { id: idUabc },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                $('#txtNombre').val(response.nombre);
                $('#txtApellidoP').val(response.apellidoP);
                $('#txtApellidoM').val(response.apellidoM);
                $('#txtEmail').val(response.email);
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
    $("#option1").hide();
    $("#option2").hide();
    $("#inputGeneral").hide();
    $("#ubicacion").hide();
    $("#facultad").hide();
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
            $("#btnNext").show();
            $("#option1").show();
            $("#option2").hide();
        } else if (selectedOption === "option2") {
            $('.search').click(searchToDatabase)
            $("#btnNext").show();
            $("#option1").hide();
            $("#option2").show();
        } else if (selectedOption === "option3" || selectedOption === "option4") {
            $('.search').click(searchToDatabase)
            $("#btnNext").show();
            $("#option1").hide();
            $("#option2").hide();
        } else {
            $("#btnNext").hide();
            $("#option1").hide();
            $("#option2").hide();
            $("#inputGeneral").hide();
        }
    });
    $("#btnNext").click(register);
}

$(document).ready(function () {
    init();
});