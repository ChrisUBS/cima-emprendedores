let alumno1 = {
    matricula: '1',
    nombre: 'Alex',
    apellidoPaterno: 'Hernandez',
    apellidoMaterno: 'Flores',
    email: 'abc@gmail.com',
}

function buscarMatricula(){
    let matricula = $('#txtId').val();
    console.log(matricula)
    if(matricula==alumno1.matricula){
        $('#txtNombre').val(alumno1.nombre);
        $('#txtApellidoP').val(alumno1.apellidoPaterno);
        $('#txtApellidoM').val(alumno1.apellidoMaterno);
        $('#txtEmail').val(alumno1.email);
    }
    else{
        notifications("alert-error", "No se encontro nada!");
    }
}

function init2(){
    $('.search').click(buscarMatricula)
}
window.onload = init2;


// function register() {
//     let selectedOption = $("#txtOption").val();
//     let newPerson = {};
    
//     switch (selectedOption) {
//         case "option1":
//             newPerson.matricula = $("input[name='matricula']").val();
//             newPerson.noEmpleado = "";
//             break;
//         case "option2":
//             newPerson.noEmpleado = $("input[name='noEmpleado']").val();
//             newPerson.matricula = "";
//             break;
//         case "option3":
//         case "option4":
//             newPerson.matricula = "";
//             newPerson.noEmpleado = "";
//             break;
//     }

//     newPerson.nombre = $("input[name='nombre']").val();
//     newPerson.apellidoP = $("input[name='apellidoP']").val();
//     newPerson.apellidoM = $("input[name='apellidoM']").val();
//     newPerson.email = $("input[name='email']").val();
    
//     checkExtra(newPerson, selectedOption);
//     validNext(newPerson, selectedOption);
// }

// function checkExtra(newPerson, selectedOption) {
//     newPerson.ubicacion = $("#txtCampus").val();
//     newPerson.facultad = $("#txtFacultad").val();
//     newPerson.taller = $("#txtTaller").val();
    
//     if (selectedOption === "option3" || selectedOption === "option4") {
//         delete newPerson.facultad;
//     }
// }

// $("#btnRegister").click(register);

// function validNext(newPerson, selectedOption) {
//     if (isValid(newPerson)) {
//         notifications("alert-success", "Registro exitoso");
//         console.log("Valor:", newPerson);
//     } else {
//         notifications("alert-error", "¡Campo requerido o no válido!");
//     }
// }
