var people = [];

class Person {
    constructor(name, lastName, middleName, email, matricula, noEmpleado, ubicacion, facultad, taller) {
        this.name = name;
        this.lastName = lastName;
        this.middleName = middleName;
        this.email = email;
        this.matricula = matricula;
        this.noEmpleado = noEmpleado;
        this.ubicacion = ubicacion;
        this.facultad = facultad;
        this.taller = taller;
    }
}


function isValid(person) {
    let validation = true;
    $("#notifications").removeClass("alert-error");
    $("#notifications").removeClass("alert-success");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verificar si alguno de los campos requeridos está vacío
    if (person.name === "" || person.lastName === "" || person.middleName === "" || person.email === "" || person.matricula === "" || person.noEmpleado === "" || person.ubicacion === "" || person.facultad === "" || person.taller === "") {
        validation = false;
        $(".input-control input").css("border-color", "initial");
        // Marcar los campos de texto vacíos con borde rojo
        $(".input-control input").each(function () {
            if ($(this).val() === "") {
                $(this).css("border-color", "red");
            }
        });
        // Marcar los select de ubicacion, facultad y taller en rojo si no se ha seleccionado ninguna opción
        if (person.ubicacion === "") {
            $("#txtCampus").css("border-color", "red");
        }
        if (person.facultad === "") {
            $("#txtFacultad").css("border-color", "red");
        }
        if (person.taller === "") {
            $("#txtTaller").css("border-color", "red");
        }
    }

    // Verificar si el campo del email es válido usando la expresión regular
    if (person.email !== "" && !emailRegex.test(person.email)) {
        validation = false;
        $(".input-control input#txtEmail").css("border-color", "red");
    }

    // Restablecer el borde rojo después de 1.5 segundos si es necesario
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

function validNext(newPerson, selectedOption){
    if (isValid(newPerson)){
        validRegister(newPerson,selectedOption);
        notifications("alert-success", "Registro exitoso");
        console.log("Valor:", newPerson);
    }else{
        notifications("alert-error", "¡Campo requerido ó no valido!");
    }
}

function validRegister(newPerson, selectedOption){
    switch (selectedOption) {
        case "option1":
            Alumno();
            $("#btnRegister").click(function(){
                checkExtra(newPerson, selectedOption);
                console.log("Valor:", newPerson);
                if (isValid(newPerson)) {
                    notifications("alert-success", "Registro exitoso");
                    console.log("Valor:", newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
        case "option2":
            Docente();
            $("#btnRegister").click(function(){
                checkExtra(newPerson, selectedOption);
                console.log("Valor:", newPerson);
                if (isValid(newPerson)) {
                    notifications("alert-success", "Registro exitoso");
                    console.log("Valor:", newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
        case "option3":
            Exterior();
            $("#btnRegister").click(function(){
                checkExtra(newPerson, selectedOption);
                console.log("Valor:", newPerson);
                if (isValid(newPerson)) {
                    notifications("alert-success", "Registro exitoso");
                    console.log("Valor:", newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break; 
        case "option4":
            Exterior();
            $("#btnRegister").click(function(){
                checkExtra(newPerson, selectedOption);
                console.log("Valor:", newPerson);
                if (isValid(newPerson)) {
                    notifications("alert-success", "Registro exitoso");
                    console.log("Valor:", newPerson);
                } else {
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
            });
            break;
    }
}

function register() {
    let selectedOption = $("#txtOption").val();
    let inputName, inputLastName, inputMiddleName, inputEmail, inputMatricula, inputNoEmpleado, selectUbicacion, selectFacultad, selectTaller;
    
    if (selectedOption === "option1") {
        inputMatricula = $("input[name='matricula']").val();
        inputName = $("input[name='nombre']").val();
        inputLastName = $("input[name='apellidoP']").val();
        inputMiddleName = $("input[name='apellidoM']").val();
        inputEmail = $("input[name='email']").val();
    } else if (selectedOption === "option2") {
        inputNoEmpleado = $("input[name='noEmpleado']").val();
        inputName = $("input[name='nombre']").val();
        inputLastName = $("input[name='apellidoP']").val();
        inputMiddleName = $("input[name='apellidoM']").val();
        inputEmail = $("input[name='email']").val();
    } else if (selectedOption === "option3") {
        inputName = $("input[name='nombre']").val();
        inputLastName = $("input[name='apellidoP']").val();
        inputMiddleName = $("input[name='apellidoM']").val();
        inputEmail = $("input[name='email']").val();
    } else if (selectedOption === "option4") {
        inputName = $("input[name='nombre']").val();
        inputLastName = $("input[name='apellidoP']").val();
        inputMiddleName = $("input[name='apellidoM']").val();
        inputEmail = $("input[name='email']").val();
    }
    let newPerson = new Person(inputName, inputLastName, inputMiddleName, inputEmail, inputMatricula, inputNoEmpleado, selectUbicacion, selectFacultad, selectTaller);
    validNext(newPerson, selectedOption);
}

function checkExtra(newPerson, selectedOption){
    let selectUbicacion = $("#txtCampus").val();
    let selectFacultad = $("#txtFacultad").val();
    let selectTaller = $("#txtTaller").val();
    if (selectedOption === "option1") {
        newPerson.ubicacion = selectUbicacion;
        newPerson.facultad = selectFacultad;
        newPerson.taller = selectTaller;
    } else if (selectedOption === "option2") {
        newPerson.ubicacion = selectUbicacion;
        newPerson.facultad = selectFacultad;
        newPerson.taller = selectTaller;
    } else if (selectedOption === "option3" || "option3") {
        newPerson.ubicacion = selectUbicacion;
        newPerson.taller = selectTaller;
    }
}

//Opciones del 1 al 4.
function Alumno(){
    $('#txtFacultad').prop('disabled', true);
    $('#txtTaller').prop('disabled', true);
    $("#btnNext").hide();
    $("#btnRegister").show();
    $("#ubicacion").show();
    $("#facultad").show();
    $("#taller").show();
    $("#ubicacion select").change(Facultad);
    $("#ubicacion select").change(Talleres);
    $("#txtOption").change(function() {
        $("#ubicacion").hide();
        $("#facultad").hide();
        $("#taller").hide();
        $("#btnRegister").hide();
    });
}
function Docente(){
    $('#txtFacultad').prop('disabled', true);
    $('#txtTaller').prop('disabled', true);
    $("#btnNext").hide();
    $("#btnRegister").show();
    $("#ubicacion").show();
    $("#facultad").show();
    $("#taller").show();
    $("#ubicacion select").change(Facultad);
    $("#ubicacion select").change(Talleres);
    $("#txtOption").change(function() {
        $("#ubicacion").hide();
        $("#facultad").hide();
        $("#taller").hide();
        $("#btnRegister").hide();
    });
}
function Exterior(){
    $('#txtFacultad').prop('disabled', true);
    $('#txtTaller').prop('disabled', true);
    $("#btnNext").hide();
    $("#btnRegister").show();
    $("#ubicacion").show();
    $("#taller").show();
    $("#ubicacion select").change(Facultad);
    $("#ubicacion select").change(Talleres);
    $("#txtOption").change(function() {
        $("#ubicacion").hide();
        $("#taller").hide();
        $("#btnRegister").hide();
    });
}


//Facultad
function Facultad() {
    var selectedUbicacion = $("#txtCampus").val();
    console.log("Selected campus:", selectedUbicacion);
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

function Talleres() {
    var selectedUbicacion = $("#txtCampus").val();
    console.log("Selected campus:", selectedUbicacion);
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

function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000);
}

function init() {
    $("#option1").hide();
    $("#option2").hide();
    $("#inputGeneral").hide();
    $("#ubicacion").hide();
    $("#facultad").hide();
    $("#taller").hide();
    $("#btnNext").hide();
    $("#btnRegister").hide();
    
    // Hook eventos
    $("#txtOption").change(function () {
        var selectedOption = $(this).val();
        
        $('#txtNombre').val('');
        $('#txtApellidoP').val('');
        $('#txtApellidoM').val('');
        $('#txtEmail').val('');

        $("#inputGeneral").show();

        if (selectedOption === "option1") {
            $("#btnNext").show();
            $("#option1").show();
            $("#option2").hide();
        } else if (selectedOption === "option2") {
            $("#btnNext").show();
            $("#option1").hide();
            $("#option2").show();
        } else if (selectedOption === "option3" || selectedOption === "option4") {
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







// function displayPerson(person){
//     let table = $("#personTable");
//     let personHTML=`
//     <tr class="">
//         <td>${person.name}</td>
//         <td>${person.lastName}</td>
//         <td>${person.middleName}</td>
//         <td>${person.email}</td>
//         <td>${person.matricula}</td>
//     </tr>
//     `;

//     table.append(personHTML);
//     $('html, body').animate({
//         scrollTop: $("#personTable").offset().top
//     }, 1000);
// }



// function init() {
//     $("#btnRegister").click(register);
// }
// window.onload = init;



// function Facultad() {
//     var selectedLocation = $("#ubicacion select").val();

//     $("#facultad select").empty();
    
//     // Agregar las opciones de facultad según la ubicación seleccionada
//     switch(selectedLocation) {
//         case "Tijuana":
//             $("#facultad select").append("<option value=''>Seleccionar Facultad</option>");
//             $("#facultad select").append("<option value='Facultad1'>Facultad 1</option>");
//             $("#facultad select").append("<option value='Facultad2'>Facultad 2</option>");
//             $("#facultad select").append("<option value='Facultad3'>Facultad 3</option>");
//             break;
//         case "Mexicali":
//             $("#facultad select").append("<option value=''>Seleccionar Facultad</option>");
//             $("#facultad select").append("<option value='FacultadA'>Facultad A</option>");
//             $("#facultad select").append("<option value='FacultadB'>Facultad B</option>");
//             $("#facultad select").append("<option value='FacultadC'>Facultad C</option>");
//             break;
//         case "Ensenada":
//             $("#facultad select").append("<option value=''>Seleccionar Facultad</option>");
//             $("#facultad select").append("<option value='FacultadX'>Facultad X</option>");
//             $("#facultad select").append("<option value='FacultadY'>Facultad Y</option>");
//             $("#facultad select").append("<option value='FacultadZ'>Facultad Z</option>");
//             break;
//         default:
//             break;
//     }
// }


// function Talleres(){
//     var selectedLocation = $("#facultad select").val();

//     $("#taller select").empty();

//     switch(selectedLocation) {
//         case "Facultad1":
//             $("#taller select").append("<option value=''>Seleccionar Taller</option>");
//             $("#taller select").append("<option value='taller1'>Taller 1</option>");
//             $("#taller select").append("<option value='taller2'>Taller 2</option>");
//             $("#taller select").append("<option value='taller3'>Taller 3</option>");
//             break;
//         case "Facultad2":
//             $("#taller select").append("<option value=''>Seleccionar Taller</option>");
//             $("#taller select").append("<option value='tallerA'>Taller A</option>");
//             $("#taller select").append("<option value='tallerB'>Taller B</option>");
//             $("#taller select").append("<option value='tallerC'>Taller C</option>");
//             break;
//         case "Facultad3":
//             $("#taller select").append("<option value=''>Seleccionar Taller</option>");
//             $("#taller select").append("<option value='tallerX'>Taller X</option>");
//             $("#taller select").append("<option value='tallerY'>Taller Y</option>");
//             $("#taller select").append("<option value='tallerZ'>Taller Z</option>");
//             break;
//         default:
//             break;
//     }
// }