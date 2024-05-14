// Función para realizar el inicio de sesión
let apiURL="http://localhost/cimarronEmprendedor/cimarrones-emprendedores/BE/"
let surveyResults = [

]

$(document).ready(function () {
    // Evento para el botón de la selección de campus
    $("#btnNext").click(function(event) {
        event.preventDefault();
        if (isValid()) {
            submitCampusForm();
        } else {
            notifications("error", "Por favor, selecciona al menos un campus.");
        }
    });

    // Evento para el botón "Siguiente" del segundo formulario
    $(".eval-event-box-button-next").click(function(event) {
        event.preventDefault();
        if (isValidEventBox()) {
            submitEventForm();
        } else {
            notifications("error", "Por favor, selecciona un evento.");
        }
    });
});

// Validación de todos los campos para el primer formulario.
function isValid() {
    var checkboxes = document.getElementsByName('opciones');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;  // Al menos uno está seleccionado
        }
    }
    return false; // Ninguno está seleccionado
}

// Función para manejar la acción de click en siguiente en formulario de campus
function submitCampusForm() {

    $(".box-handler").toggle(false);
    $(".event-box").toggle(true);
    $(".question-box").toggle(false);

    var selectedValues = $('input[name="opciones"]:checked').map(function() { //Oculta la caja de escoger campus en feedback 
        return this.value;
    }).get();
    getTalleres();
    console.log(selectedValues);

}
//funcion para enviar de regreso con el boton de Atras
function backAgain(){
    $(".box-handler").toggle(true);
    $(".event-box").toggle(false);
    $(".question-box").toggle(false);
    console.log("Back Agaiiiiin")
}

// Función para manejar la acción dar click en siguiente en el campo de seleccione un evento 
function submitEventForm() {
    $(".box-handler").toggle(false);
    $(".event-box").toggle(false);
    $(".question-box").toggle(true);
    var selectedEvent = $('#eval-event-box-select').val();
    console.log(selectedEvent);
}

function sendFeedback() {
    $(".box-handler").toggle(false);
    $(".event-box").toggle(false);
    $(".question-box").toggle(false);
    $(".thanks-box").toggle(true);
    $(".evaluacion-box").toggle(false);
    $(".button-send").toggle(false);
    $(".button-back").toggle(false);

    var feedback = {
        campus: $('input[name="opciones"]:checked').val(),
        event: $('#eval-event-box-select').val(),
        rating1: $('input[name="rating1"]:checked').val(),
        rating2: $('input[name="rating2"]:checked').val(),
        rating3: $('input[name="rating3"]:checked').val(),
        eventlike: $('#eventlike').val(),
        eventdislike: $('#eventdislike').val(),
        recommendation: $('input[name="recommendation"]:checked').val(),
        assist: $('input[name="assist"]:checked').val(),
        upcomingEvents: $('#upcomingEvents').val(),
        eventImprovements: $('#eventImprovements').val()
    }
    surveyResults.push(feedback);
    console.log(surveyResults);
    notifications("success", "¡Gracias por tu feedback!");
}
//obtener valor de El evento cumplio mis expectativas:
document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="rating1"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Valor seleccionado: ', this.value);
        });
    });
});

//Me fue de utilidad la informacion:
document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="rating2"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Valor seleccionado: ', this.value);
        });
    });
});
//Como consideras el dominio del tema del conferencista?
document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="rating3"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Valor seleccionado: ', this.value);
        });
    });
});

//que fue lo que mas te gusto del evento?
document.getElementById('buttonSend').addEventListener('click', function(event) {
    event.preventDefault();  // Previene que el formulario se envíe de manera tradicional
    var feedback = document.getElementById('eventlike').value;
    console.log('Respuesta ingresada: ', feedback);
});

document.getElementById('buttonSend').addEventListener('click', function(event) {
    event.preventDefault();  // Previene que el formulario se envíe de manera tradicional
    var feedback = document.getElementById('eventdislike').value;
    console.log('Respuesta ingresada: ', feedback);
});

//recomendarias?
document.getElementById('buttonSend').addEventListener('click', function(event) {
    event.preventDefault();  // Previene que el formulario se envíe de manera tradicional
    var recommendationChecked = document.querySelector('input[name="recommendation"]:checked');
    if (recommendationChecked) {
        var recommendationValue = recommendationChecked.value;
        console.log('Recomendación seleccionada: ', recommendationValue);
    } else {
        console.log('No se ha seleccionado ninguna respuesta.');
    }
});

//volverias a asistir?
document.getElementById('buttonSend').addEventListener('click', function(event) {
    event.preventDefault();  // Previene que el formulario se envíe de manera tradicional
    var assistChecked = document.querySelector('input[name="assist"]:checked');
    if (assistChecked) {
        var assistValue = assistChecked.value;
        console.log('Volverias a asistir: ', assistValue);
    } else {
        console.log('No se ha seleccionado ninguna respuesta.');
    }
});

//temas que te gustaria tratar?
document.getElementById('buttonSend').addEventListener('click', function(event) {
    event.preventDefault();  // Previene que el formulario se envíe de manera tradicional
    var discussion = document.getElementById('upcomingEvents').value;
    console.log(discussion);
});

//mejoras para el evento 
document.getElementById('buttonSend').addEventListener('click', function(event) {
    event.preventDefault();  // Previene que el formulario se envíe de manera tradicional
    var upcoming = document.getElementById('eventImprovements').value;
    console.log(upcoming);
});

// Animación de las notificaciones
function notifications(type, msg) {
    let div = $("#notifications");
    div.slideDown(1000);
    div.addClass(type);
    div.text(msg);
    div.slideUp(3000, function() {
        div.removeClass(type); // Limpiar clase después de la animación
    });
}

// Validación para el segundo formulario.
function isValidEventBox() {
    return $('#eval-event-box-select').val() !== null; // Asegúrate de que se ha seleccionado un evento
}


//FUNCION PARA CUANDO CARGA LA PAGINA SOLO MOSTRAR SELECCION DE CAMPUS 
document.addEventListener('DOMContentLoaded', function() {
    $(".box-handler").toggle(true);
    $(".event-box").toggle(false);
    $(".question-box").toggle(false);
    $(".thanks-box").toggle(false);

});

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
                    selectTaller.append(`<option value='${taller.idworkshop}'>${taller.nombre}</option>`);
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