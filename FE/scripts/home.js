let apiURL = "http://localhost/cimarrones-emprendedores/BE/";

function generateChartsCampus() {
    $.ajax({
        url: `${apiURL}dashboard/get_register.php`,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                const usuariosRegistrados = response.data;
                const conteoCampus = usuariosRegistrados.reduce((acc, usuario) => {
                    acc[usuario.campus] = (acc[usuario.campus] || 0) + 1;
                    return acc;
                }, {});
                const labelsCampus = Object.keys(conteoCampus).map(campus => `${campus}: ${conteoCampus[campus]}`);
                const dataCampus = Object.values(conteoCampus);
                const pctx = document.getElementById('graph1').getContext('2d');
                const CampusChart = new Chart(pctx, {
                    type: 'pie',
                    data: {
                        labels: (labelsCampus),
                        datasets: [{
                            label: 'Participación por Campus',
                            data: dataCampus,
                            backgroundColor: [
                                'rgba(0, 255, 0, 0.5)', // Ensenada
                                'rgba(54, 162, 235, 0.5)', // Mexicali
                                'rgba(255, 206, 86, 0.5)' // Tijuana
                            ],
                            borderColor: [
                                'rgba(0, 255, 0, 1)', // Ensenada
                                'rgba(54, 162, 235, 1)', // Mexicali
                                'rgba(255, 206, 86, 1)' // Tijuana
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Participación por Campus'
                            },
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            // datalabels: {
                            //     color: '#000',
                            //     anchor: 'center',
                            //     align: 'center',
                            //     borderWidth: 0.5,
                            //     borderColor: '#000',
                            //     borderRadius: 5,
                            //     backgroundColor: 'rgba(255,255,255,0.7)',
                            //     font: {
                            //         weight: 'bold'
                            //     },
                            //     formatter: (value) => {
                            //         return value;
                            //     }
                            // }
                        }
                    },
                    // plugins: [ChartDataLabels]
                });
            } else {
                console.error('Error en la respuesta de PHP:', response.error);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
    });
}

function generateChartType() {
    $.ajax({
        url: `${apiURL}dashboard/get_register.php`,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                const usuariosRegistrados = response.data;
                const conteoTipos = usuariosRegistrados.reduce((acc, usuario) => {
                    acc[usuario.type] = (acc[usuario.type] || 0) + 1;
                    return acc;
                }, {});
                const labelsTipos = Object.keys(conteoTipos).map(tipo => `${tipo}: ${conteoTipos[tipo]}`);
                const dataTipos = Object.values(conteoTipos);
                const tctx = document.getElementById('graph2').getContext('2d');
                const typeChart = new Chart(tctx, {
                    type: 'pie',
                    data: {
                        labels: labelsTipos,
                        datasets: [{
                            label: 'Registros por Tipo',
                            data: dataTipos,
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                                'rgba(54, 162, 235, 0.5)'
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Registros por Tipo'
                            },
                            // datalabels: {
                            //     color: '#000',
                            //     anchor: 'center',
                            //     align: 'center',
                            //     borderWidth: 0.5,
                            //     borderColor: '#000',
                            //     borderRadius: 5,
                            //     backgroundColor: 'rgba(255,255,255,0.7)',
                            //     font: {
                            //         weight: 'bold'
                            //     },
                            //     formatter: (value) => {
                            //         return value;
                            //     }
                            // }
                        }
                    },
                    // plugins: [ChartDataLabels]
                });
            } else {
                console.error('Error en la respuesta de PHP:', response.error);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
    });
}

function exportChart(canvasId) {
    const canvas = $('#' + canvasId)[0];
    const imageData = canvas.toDataURL();
    const downloadLink = document.createElement('a');
    downloadLink.href = imageData;
    downloadLink.download = 'estadistica.png';
    downloadLink.click();
}

function searchToDatabase() {
    $.ajax({
        type: "GET",
        url: `${apiURL}dashboard/get_register.php`,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                updateRegisterList(response.data);
            } else {
                console.log("Error en la respuesta:", response.error);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error en la solicitud al servidor:", error);
        }
    });
}

function updateRegisterList(registers) {
    const listaAlumnos = $('#listaAlumnos');
    listaAlumnos.empty();

    const lastRegisters = registers.slice(-8);

    lastRegisters.forEach(function(registro) {
        listaAlumnos.prepend(`
            <tr id="${registro.idregistro}">
                <td>${registro.name}</td>
                <td>${registro.lastname} ${registro.middlename}</td>
                <td>${registro.type}</td>
                <td>${registro.nameworkshop}</td>
                <td>${registro.campus}</td>
            </tr>
        `);
    });
}

// Función para inicializar todas las funciones al cargar el DOM
function init() {
    generateChartsCampus();
    generateChartType();
    searchToDatabase();

    setInterval(searchToDatabase, 5000);

    $(document).ready(function() {
        $('#btnGraph1').off('click').on('click', function() {
            exportChart('graph1');
        });
    
        $('#btnGraph2').off('click').on('click', function() {
            exportChart('graph2');
        });
    });
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    init();
});
