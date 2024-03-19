let alumno1 = {
    matricula: '127900',
    nombre: 'Alex',
    apellidoPaterno: 'Hernandez',
    apellidoMaterno: 'Flores',
    email: 'abc@gmail.com',
}

function buscarMatricula(){
    let matricula = $('#txtMatricula').val();
    if(matricula==alumno1.matricula){
        $('#txtNombre').val(alumno1.nombre);
        $('#txtApellidoP').val(alumno1.apellidoPaterno);
        $('#txtApellidoM').val(alumno1.apellidoMaterno);
        $('#email').val(alumno1.email);
    }else{
        notifications("alert-error", "No se encontro nada!");
    }
}

function init2(){
    $('#search').click(buscarMatricula)
}
window.onload = init2;