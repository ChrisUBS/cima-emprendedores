// Función para realizar el inicio de sesión
let apiURL="http://localhost/cimarrones-emprendedores/BE/"

let feedback = {};
function firstValid(feedback) {
    let validation = true;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function markEmptyFields() {
        let isValid = true;
    
        $(".input-general input, .input-general select").each(function () {
            if ($(this).val() === "" || $(this).val() === null || $(this).val() === undefined) {
                $(this).css("border-color", "red");
                let errorMessage = "¡Campo requerido!";
                let errorField = $(this).siblings('.error');
                errorField.stop(true, true).slideUp(0);
                errorField.text(errorMessage).stop(true, true).slideDown(300);
                setTimeout(function() {
                    errorField.stop(true, true).slideUp(100);
                }, 1000);
                isValid = false;
            } else {
                $(this).css("border-color", "");
                $(this).siblings('.error').text("").hide();
            }
        });
    
        if (!emailRegex.test(feedback.email)) {
            $("#txtEmail").css("border-color", "red");
            let errorMessage = "¡Campo requerido o no válido!";
            let errorField = $("#txtEmail").siblings('.error');
            errorField.stop(true, true).slideUp(0);
            errorField.text(errorMessage).stop(true, true).slideDown(300);
            setTimeout(function() {
                errorField.stop(true, true).slideUp(100);
            }, 1000);
            isValid = false;
        }
    
        return isValid;
    }
    

    // Validar campos vacíos
    if (!feedback.ubicacion || !feedback.taller || !emailRegex.test(feedback.email)) {
        markEmptyFields();
        validation = false;
    }

    if (!validation) {
        setTimeout(function () {
            $(".input-general input").css("border-color", "initial");
            $(".input-general textarea").css("border-color", "initial");
            $("#txtCampus").css("border-color", "initial");
            $("#txtTaller").css("border-color", "initial");
        }, 1000);
    }

    return validation;
}

function secondValid(feedback) {
    let validation = true;

    // Validar campos de radio buttons
    if (!$("input[name='rating1']").is(":checked") || !$("input[name='rating2']").is(":checked") || !$("input[name='rating3']").is(":checked") || !$("input[name='recommendation']").is(":checked") || !$("input[name='assist']").is(":checked")) {
        validation = false;
    }

    return validation;
}

// Función que compara la fecha actual con la fecha del taller
function isEventToday(eventDate) {
    const today = new Date().toLocaleDateString('sv-SE');
    return today === eventDate;
}

function getTalleres() {
    var selectedUbicacion = $("#txtCampus").val();
    $.ajax({
        type: "GET",
        url: `${apiURL}register/get_workshops.php`,
        data: { ubicacion: selectedUbicacion },
        success: function(response) {
            // console.log("Respuesta de talleres:", response);
            var selectTaller = $("#txtTaller");
            selectTaller.empty();
            
            if (response && response.success && response.talleres && response.talleres.length > 0) {
                $('#txtTaller').prop('disabled', false);
                selectTaller.append("<option value=''></option>");
                var talleresDisponibles = false;
                response.talleres.forEach(taller => {
                    if (isEventToday(taller.date)) {
                        talleresDisponibles = true;
                        selectTaller.append(`<option value='${taller.idworkshop}'>${taller.nombre}</option>`);
                    }
                });
                if (!talleresDisponibles) {
                    selectTaller.append(`<option disabled>No hay talleres disponibles.</option>`);
                }
            } else {
                selectTaller.append(`<option disabled>No hay talleres disponibles.</option>`);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener los talleres:", error);
        }
    });
}

function checkUser(feedback) {
    console.log(feedback);
    $.ajax({
        url: `${apiURL}feedback/check_user.php`,
        method: 'POST',
        data: {
            email: feedback.email,
            idworkshop: feedback.taller
        },
        dataType: 'json',
        success: function (response) {
            if (response.valid) {
                $("#select").hide();
                $("#btnNext").hide();
                $("#feedback").show();
                $("#btnSend").show();
                $("#btnBack").show();
                $("#btnBack").click(function(){
                    $("#select").show();
                    $("#btnNext").show();
                    $("#feedback").hide();
                    $("#btnSend").hide();
                    $("#btnBack").hide();
                    $("#feedback .input, #feedback .select").empty();
                });
                $('#btnSend').off('click').on('click', function() {
                    $('#btnSend').prop('disabled', true);
                    endFeedback();
                    setTimeout(() => {
                        $('#btnSend').prop('disabled', false);
                    }, 3000);
                });
            } else {
                // alert(response.message);
                $("#error-container").text(response.message || "¡Email inválido o encuesta ya contestada!").slideDown(300).delay(1500).slideUp(300);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al verificar el usuario:", error);
            alert("Error en la conexión o el servidor. Intente de nuevo más tarde.");
        }
    });
}


function saveFeedback(feedback) {
    console.log(feedback);
    $.ajax({
        url: `${apiURL}dashboard/save_feedback.php`,
        method: 'POST',
        data: {
            idworkshop: feedback.taller,
            idcampus: feedback.ubicacion,
            email: feedback.email,
            q1: feedback.question1,
            q2: feedback.question2,
            q3: feedback.question3,
            q4: feedback.question4,
            q5: feedback.question5,
            q6: feedback.question6,
            q7: feedback.question7,
            q8: feedback.question8,
            q9: feedback.question9
        },
        dataType: 'json',
        success: function (response) {
            console.log(response.data);
            if (response.success) {
                $("#btnSend, #btnBack, #welcome").fadeOut(140);
                $("#submit").show()
                $("#feedback").hide()
                setTimeout(function () {
                    location.reload();
                }, 5000);
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

function holdFocus(){
    $('.input-general input, .input-general textarea, .input-general select').on('blur', function(){
        if($(this).val() !== '') {
            $(this).addClass('has-content');
        } else {
            $(this).removeClass('has-content');
        }
    });
}


function endFeedback(){
    feedback.question1 = $("input[name='rating1']:checked").val();
    feedback.question2 = $("input[name='rating2']:checked").val();
    feedback.question3 = $("input[name='rating3']:checked").val();
    feedback.question4 = $("#question4").val();
    feedback.question5 = $("#question5").val();
    feedback.question6 = $("input[name='recommendation']:checked").val();
    feedback.question7 = $("input[name='assist']:checked").val();
    feedback.question8 = $("#question8").val();
    feedback.question9 = $("#comments").val();
    if (secondValid(feedback)) {
        saveFeedback(feedback);
        
    } else {
        console.log("¡Los datos del formulario no son válidos!");
    }
}

function startFeedback() {
    feedback.ubicacion = $("#txtCampus").val();
    feedback.taller  = $("#txtTaller").val();
    feedback.email = $("#txtEmail").val();
    if (firstValid(feedback)) {
        checkUser(feedback);
    } else {
        // console.log("¡Campo requerido o no válido!");
        // console.log(feedback);
    }
}

//main
function init() {
    holdFocus();
    $("#select").show();
    $("#feedback").hide();
    $("#btnSend").hide();
    $("#btnBack").hide();
    $("#submit").hide();
    getTalleres();
    $("#txtCampus").change(getTalleres);
    $("#btnNext").click(function(){
        startFeedback();
        }
    );
}

$(document).ready(function () {
    init();
});