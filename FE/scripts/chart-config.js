// // Datos de usuarios
// const usuariosRegistrados = [
//     { nombre: "Ana Ruiz", carrera: "Ingeniería Mecánica", campus: "Ensenada" },
//     { nombre: "Carlos Hernández", carrera: "Medicina", campus: "Tijuana" },
//     { nombre: "Luisa Martínez", carrera: "Administración", campus: "Mexicali" },
//     { nombre: "Jorge Torres", carrera: "Ingeniería Mecánica", campus: "Mexicali" },
//     { nombre: "Sofía Castro", carrera: "Medicina", campus: "Ensenada" },
//     { nombre: "Ricardo Gómez", carrera: "Administración", campus: "Tijuana" },
//     { nombre: "Elena Jiménez", carrera: "Ingeniería Mecánica", campus: "Tijuana" },
//     { nombre: "Miguel Ángel Ponce", carrera: "Medicina", campus: "Mexicali" },
//     { nombre: "Diana Salazar", carrera: "Administración", campus: "Ensenada" },
//     { nombre: "Mario Bros", carrera: "Ingeniería Mecánica", campus: "Ensenada" }
// ];

// document.addEventListener('DOMContentLoaded', function () {
//     // Contar la participación por carreras
//     const conteoCarreras = usuariosRegistrados.reduce((acc, usuario) => {
//         acc[usuario.carrera] = (acc[usuario.carrera] || 0) + 1;
//         return acc;
//     }, {});

    

//     // Preparar datos para el gráfico
//     const labels = Object.keys(conteoCarreras);
//     const data = Object.values(conteoCarreras);

//     // Crear el gráfico
//     const bctx = document.getElementById('barChart').getContext('2d');
//     const barchart = new Chart(bctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Participación por Carreras',
//                 data: data,
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// });

// Datos de usuarios
const usuariosRegistrados = [
    { nombre: "Ana Ruiz", carrera: "Ingeniería Mecánica", campus: "Ensenada" },
    { nombre: "Carlos Hernández", carrera: "Medicina", campus: "Tijuana" },
    { nombre: "Luisa Martínez", carrera: "Administración", campus: "Mexicali" },
    { nombre: "Jorge Torres", carrera: "Ingeniería Mecánica", campus: "Mexicali" },
    { nombre: "Sofía Castro", carrera: "Medicina", campus: "Ensenada" },
    { nombre: "Ricardo Gómez", carrera: "Administración", campus: "Tijuana" },
    { nombre: "Elena Jiménez", carrera: "Ingeniería Mecánica", campus: "Tijuana" },
    { nombre: "Miguel Ángel Ponce", carrera: "Medicina", campus: "Mexicali" },
    { nombre: "Diana Salazar", carrera: "Administración", campus: "Ensenada" },
    { nombre: "Mario Bros", carrera: "Ingeniería Mecánica", campus: "Ensenada" }
];

document.addEventListener('DOMContentLoaded', function () {
    // Contar la participación por carreras
    const conteoCarreras = usuariosRegistrados.reduce((acc, usuario) => {
        acc[usuario.carrera] = (acc[usuario.carrera] || 0) + 1;
        return acc;
    }, {});

    // Contar la participación por campus
    const conteoCampus = usuariosRegistrados.reduce((acc, usuario) => {
        acc[usuario.campus] = (acc[usuario.campus] || 0) + 1;
        return acc;
    }, {});

    // Preparar datos para la gráfica de barras
    const labelsCarreras = Object.keys(conteoCarreras);
    const dataCarreras = Object.values(conteoCarreras);
    const bctx = document.getElementById('barChart').getContext('2d');
    const barchart = new Chart(bctx, {
        type: 'bar',
        data: {
            labels: labelsCarreras,
            datasets: [{
                label: 'Participación por Carreras',
                data: dataCarreras,
                backgroundColor: [
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(0, 255, 0, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Preparar datos para la gráfica de pastel
    const labelsCampus = Object.keys(conteoCampus);
    const dataCampus = Object.values(conteoCampus);
    const pctx = document.getElementById('pieChart').getContext('2d');
    const piechart = new Chart(pctx, {
        type: 'pie',
        data: {
            labels: labelsCampus,
            datasets: [{
                label: 'Participación por Campus',
                data: dataCampus,
                backgroundColor: [
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(0, 255, 0, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
});
