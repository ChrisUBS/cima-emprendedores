let menuToggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let leftDiv = document.querySelector('.left-div');
let rightDiv = document.querySelector('.right-div');

// Alternar clases 'active' al hacer clic en el botón de toggle
menuToggle.onclick = function() {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
    leftDiv.classList.toggle('active');
    rightDiv.classList.toggle('active');
}
let list = document.querySelectorAll('.list');

// Añadir un evento de clic a cada elemento de la lista
for(let i = 0; i < list.length; i++) {
    list[i].onclick = function() {
        let j = 0;
        while (j < list.length) {
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }
}

// Usar jQuery para mostrar u ocultar el texto 'm-cima' basado en el estado del menú
$(document).ready(function() {
    $(".open").click(function() {
        $(".m-cima").css('display', 'block');
    });
    $(".close").click(function() {
        $(".m-cima").css('display', 'none');
    });
});
