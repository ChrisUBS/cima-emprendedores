let menuToggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let leftDiv = document.querySelector('.left-div');
let rightDiv = document.querySelector('.right-div');
let mCima = document.querySelector('.m-cima');

function disableTransition() {
    navigation.classList.add('no-transition');
    leftDiv.classList.add('no-transition');
    rightDiv.classList.add('no-transition');
}

function enableTransition() {
    navigation.classList.remove('no-transition');
    leftDiv.classList.remove('no-transition');
    rightDiv.classList.remove('no-transition');
}

function toggleMenu() {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
    leftDiv.classList.toggle('active');
    rightDiv.classList.toggle('active');
    mCima.style.display = menuToggle.classList.contains('active') ? 'block' : 'none';
}

// Alternar clases 'active' al hacer clic en el botón de toggle
menuToggle.onclick = function() {
    toggleMenu();
    localStorage.setItem('toggleActive', menuToggle.classList.contains('active'));
}

let list = document.querySelectorAll('.list');

// Añadir un evento de clic a cada elemento de la lista
for (let i = 0; i < list.length; i++) {
    list[i].onclick = function() {
        let j = 0;
        while (j < list.length) {
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }
}

// Al cargar la página, establecer el estado del toggle desde localStorage
window.onload = function() {
    if (localStorage.getItem('toggleActive') === 'true') {
        toggleMenu();
        mCima.style.display = 'block';
    }
    disableTransition();
    setTimeout(enableTransition, 0);
}
