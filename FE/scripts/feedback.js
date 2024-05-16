// Función para realizar el inicio de sesión
let apiURL="http://localhost/cimarrones-emprendedores/BE/"

let feedback = {};
function firstValid(feedback) {
    let validation = true;

    function markEmptyFields() {
        $(".input-general input, .input-general select").each(function () {
            if ($(this).val() === "") {
                $(this).css("border-color", "red");
                let errorMessage = "¡Campo requerido!";
                let errorField = $(this).siblings('.error');
                errorField.slideUp(0);
                errorField.text(errorMessage).slideDown(300);
                setTimeout(function() {
                    errorField.slideUp(100);
                }, 1000);
                validation = false;
            } else {
                $(this).css("border-color", "");
                $(this).siblings('.error').text("").hide();
            }
        });
    }

    // Validar campos vacíos
    if (feedback.ubicacion === "" || feedback.taller === "") {
        validation = false;
        markEmptyFields();
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

function getTalleres() {
    var selectedUbicacion = $("#txtCampus").val();
    $.ajax({
        type: "GET",
        url: `${apiURL}register/get_workshops.php`,
        data: { ubicacion: selectedUbicacion },
        success: function(response) {
            console.log("Respuesta de talleres:", response);
            var selectTaller = $("#txtTaller");
            selectTaller.empty();
            
            if (response && response.success && response.talleres && response.talleres.length > 0) {
                $('#txtTaller').prop('disabled', false);
                selectTaller.append("<option value=''></option>");
                var talleresDisponibles = false;
                
                response.talleres.forEach(taller => {
                    if (taller.status === 1) {
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

function saveFeedback(feedback) {
    console.log(feedback);
    $.ajax({
        url: `${apiURL}dashboard/save_feedback.php`,
        method: 'POST',
        data: {
            idworkshop: feedback.taller,
            idcampus: feedback.ubicacion,
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
                $("#btnSend, #btnBack").fadeOut(140);
                $(".success").text("¡Formulario Enviado!").slideDown(300, function() {
                    $(this).delay(2000).slideUp(300, function() {
                        setTimeout(function () {
                            location.reload();
                        }, 4000);
                    });
                });
                console.log("Listo");
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
    if (firstValid(feedback)) {
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
        $("#btnSend").click(function(){
            endFeedback();
        });
    } else {
        console.log("¡Campo requerido o no válido!");
    }
}

//main
function init() {
    $("#select").show();
    $("#feedback").hide();
    $("#btnSend").hide();
    $("#btnBack").hide();
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