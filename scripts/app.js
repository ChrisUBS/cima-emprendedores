var people = [];

class Person {
    constructor(name, lastName, middleName, email, matricula, noEmpleado) {
        this.name = name;
        this.lastName = lastName;
        this.middleName = middleName;
        this.email = email;
        this.matricula = matricula;
        this.noEmpleado = noEmpleado;
    }
}


function isValid(person, ubicacion, facultad, taller) {
    let validation = true;
    $("#notifications").removeClass("alert-error");
    $("#notifications").removeClass("alert-success");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (person.name === "" || person.lastName === "" || person.middleName === "" || person.email === "" || person.matricula === "" || person.noEmpleado === "" || ubicacion === "" || facultad === "" || taller === "") {
        validation = false;
        $(".input-control input").css("border-color", "initial");
        $(".input-control input").each(function () {
            if ($(this).val() === "") {
                $(this).css("border-color", "red");
            }
        });
    }

    // Verificar que el campo del email sea válido.
    if (person.email !== "" && !emailRegex.test(person.email)) {
        validation = false;
        $(".input-control input#email").css("border-color", "red");
    }

    // Timer para restablecer el borde rojo después de 1.5 segundos si es necesario.
    if (!validation) {
        setTimeout(function () {
            $(".input-control input").css("border-color", "initial");
        }, 1500);
    }

    return validation;
}

function validRegister(){

}

function register() {
    var selectedOption = $("#txtService").val();
    var inputName, inputLastName, inputMiddleName, inputEmail, inputMatricula, inputNoEmpleado, selectedUbicacion, selectedFacultad, selectedTaller;

    if (selectedOption === "option1") {
        inputMatricula = $("#option1 input[name='']").eq(0).val();
        inputName = $("#option1 input[name='']").eq(1).val();
        inputLastName = $("#option1 input[name='']").eq(2).val();
        inputMiddleName = $("#option1 input[name='']").eq(3).val();
        inputEmail = $("#option1 input[name='']").eq(4).val();
    } else if (selectedOption === "option2") {
        inputNoEmpleado = $("#option2 input[name='']").eq(0).val();
        inputName = $("#option2 input[name='']").eq(1).val();
        inputLastName = $("#option2 input[name='']").eq(2).val();
        inputMiddleName = $("#option2 input[name='']").eq(3).val();
        inputEmail = $("#option2 input[name='']").eq(4).val();
    } else if (selectedOption === "option3") {
        inputName = $("#option3 input[name='']").eq(0).val();
        inputLastName = $("#option3 input[name='']").eq(1).val();
        inputMiddleName = $("#option3 input[name='']").eq(2).val();
        inputEmail = $("#option3 input[name='']").eq(3).val();
    } else if (selectedOption === "option4") {
        inputName = $("#option4 input[name='']").eq(0).val();
        inputLastName = $("#option4 input[name='']").eq(1).val();
        inputMiddleName = $("#option4 input[name='']").eq(2).val();
        inputEmail = $("#option4 input[name='']").eq(3).val();
    }

    selectedUbicacion = $("#ubicacion select").val();
    selectedFacultad = $("#facultad select").val();
    selectedTaller = $("#taller select").val();
    

    let newPerson = new Person(inputName, inputLastName, inputMiddleName, inputEmail, inputMatricula, inputNoEmpleado);

    if (isValid(newPerson)) {
        // displayPerson(newPerson);
        // people.push(newPerson);
        // notifications("alert-success", "Registro exitoso");
                // if(isValid(newPerson, selectedUbicacion, selectedFacultad, selectedTaller)){
                //     notifications("alert-success", "Registro exitoso");
                // }else{
                //     notifications("alert-error", "¡Campo requerido ó no valido!");
                // }
        switch (selectedOption) {
            case "option1":
                Alumno();
                break;
            case "option2":
                Docente();

                break;
            case "option3":
                Egresado();
                if(isValid(newPerson, selectedUbicacion, selectedTaller)){
                    notifications("alert-success", "Registro exitoso");
                }else{
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
                break; 
            case "option4":
                Externo();
                if(isValid(newPerson, selectedUbicacion, selectedTaller)){
                    notifications("alert-success", "Registro exitoso");
                }else{
                    notifications("alert-error", "¡Campo requerido ó no valido!");
                }
                break; 
        }
    } else {
        notifications("alert-error", "¡Campo requerido ó no valido!");
    }

}


//Opciones del 1 al 4.
function Alumno(){
    $("#btnNext").hide();
    $("#btnRegister").show();
    $("#ubicacion").show();
    $("#facultad").show();
    $("#taller").show();
    $("#ubicacion select").change(Facultad);
    $("#ubicacion select").change(Talleres);
    $("#txtService").change(function() {
        $("#txtService2").removeAttr('disabled');
        $("#ubicacion").hide();
        $("#facultad").hide();
        $("#taller").hide();
    });
}
function Docente(){
    $("#btnNext").text("Registrarse");
    $("#ubicacion").show();
    $("#facultad").show();
    $("#taller").show();
    $("#ubicacion select").change(Facultad);
    $("#ubicacion select").change(Talleres);
    $("#txtService").change(function() {
        $("#ubicacion").hide();
        $("#facultad").hide();
        $("#taller").hide();
    });
}
function Egresado(){
    $("#btnNext").text("Registrarse");
    $("#ubicacion").show();
    $("#taller").show();
    $("#ubicacion select").change(Facultad);
    $("#ubicacion select").change(Talleres);
    $("#txtService").change(function() {
        $("#ubicacion").hide();
        $("#taller").hide();
    });
}
function Externo(){
    $("#btnNext").text("Registrarse");
    $("#ubicacion").show();
    $("#taller").show();
    $("#ubicacion select").change(Facultad);
    $("#ubicacion select").change(Talleres);
    $("#txtService").change(function() {
        $("#ubicacion").hide();
        $("#taller").hide();
    });
}

//Facultad
function Facultad() {
    $('#txtService2').removeAttr('disabled');

    const facultadesXUbicacion = {
        "Tijuana": ["Facultad de Artes", "Facultad de Ciencias Químicas e Ingeniería", "Facultad de Contaduría y Administración", "Facultad de Ciencias de la Salud, Valle de las Palmas", "Facultad de Deportes", "Facultad de Derecho", "Facultad de Economía y Relaciones Internacionales", "Facultad de Humanidades y Ciencias Sociales", "Facultad de Idiomas", "Facultad de la Ingeniería y Tecnología", "Facultad de Medicina y Psicología", "Facultad de Odontología", "Facultad de Turismo y Mercadotecnia", "Instituto de Investigaciones Históricas", "Facultad de Ciencias de la Ingeniería, Administrativas y Sociales"],
        "Mexicali": ["Facultad de Artes", "Facultad de Arquitectura y Diseño", "Instituto de Ciencias Agrícolas", "Facultad de Ciencias Sociales y Políticas", "Facultad de Ciencias Humanas", "Facultad de Ciencias Administrativas", "Facultad de Deportes", "Facultad de Derecho", "Facultad de Enfermería", "Facultad de Idiomas", "Facultad de Ingeniería", "Facultad de Ingeniería y Negocios Guadalupe Victoria", "Instituto de Investigaciones en Ciencias Veterinarias", "Instituto de Investigaciones Culturales (IIC Museo)", "Instituto de Investigaciones Sociales", "Instituto de Ingeniería", "Facultad de Medicina", "Facultad de Odontología", "Facultad de Pedagogía e Innovación Educativa"],
        "Ensenada": ["Facultad de Artes", "Escuela de Ciencias de la Salud", "Facultad de Ciencias", "Facultad de Ciencias Administrativas y Sociales", "Facultad de Ciencias Marinas", "Facultad de Deportes", "Facultad de Enología y Gastronomía", "Facultad de Idiomas", "Facultad de Ingeniería y Negocios - San Quintín", "Facultad de Ingeniería, Arquitectura y Diseño", "Instituto de Investigación y Desarrollo Educativo", "Instituto de Investigaciones Oceanológicas"]
    };
    
    var selectedUbicacion = $("#ubicacion select").val();
    const selectFacultad = $("#facultad select");

    selectFacultad.empty();

    if (selectedUbicacion) {
        selectFacultad.append("<option value=''>Seleccionar Facultad</option>");
        const facultades = facultadesXUbicacion[selectedUbicacion];
        facultades.forEach(facultad => {
            selectFacultad.append(`<option value='${facultad}'>${facultad}</option>`);
        });
    } else {
        selectFacultad.append("<option value=''>Seleccionar Facultad</option>");
    }
}

function Talleres() {
    const talleresXUbicacion = {
        "Tijuana": ["Taller 1", "Taller 2", "Taller 3"],
        "Mexicali": ["Taller A", "Taller B", "Taller C"],
        "Ensenada": ["Taller X", "Taller Y", "Taller Z"]
    };
    
    var selectedUbicacion = $("#ubicacion select").val();
    const selectTaller = $("#taller select");

    selectTaller.empty();

    if (selectedUbicacion) {
        selectTaller.append("<option value=''>Seleccionar Taller</option>");
        const talleres = talleresXUbicacion[selectedUbicacion];
        talleres.forEach(taller => {
            selectTaller.append(`<option value='${taller}'>${taller}</option>`);
        });
    } else {
        selectTaller.append("<option value=''>Seleccionar Taller</option>");
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
    $("#option3").hide();
    $("#option4").hide();
    $("#ubicacion").hide();
    $("#facultad").hide();
    $("#taller").hide();
    $("#btnNext").hide();
    $("#btnRegister").hide();
    
    // Hook eventos
    $("#txtService").change(function () {
        var selectedOption = $(this).val();

        if (selectedOption === "option1") {
            $("#btnNext").show();
            $("#option1").show();
            $("#option2").hide();
            $("#option3").hide();
            $("#option4").hide();
        } else if (selectedOption === "option2") {
            $("#btnNext").show();
            $("#option1").hide();
            $("#option2").show();
            $("#option3").hide();
            $("#option4").hide();
        } else if (selectedOption === "option3") {
            $("#btnNext").show();
            $("#option1").hide();
            $("#option2").hide();
            $("#option3").show();
            $("#option4").hide();
        } else if (selectedOption === "option4") {
            $("#btnNext").show();
            $("#option1").hide();
            $("#option2").hide();
            $("#option3").hide();
            $("#option4").show();
        } else {
            $("#btnNext").hide();
            $("#option1").hide();
            $("#option2").hide();
            $("#option3").hide();
            $("#option4").hide();
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