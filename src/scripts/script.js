// Obtém os modais
var loginModal = document.getElementById("loginModal");
var registerModal = document.getElementById("registerModal");

// Obtém os botões que abrem os modais
var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");

// Obtém os elementos <span> que fecham os modais
var closeLogin = document.getElementById("closeLogin");
var closeRegister = document.getElementById("closeRegister");

// Quando o usuário clica no botão, abre o modal de login
loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

// Quando o usuário clica no botão, abre o modal de cadastro
registerBtn.onclick = function() {
    registerModal.style.display = "block";
}

// Quando o usuário clica em <span> (x), fecha o modal de login
closeLogin.onclick = function() {
    loginModal.style.display = "none";
}

// Quando o usuário clica em <span> (x), fecha o modal de cadastro
closeRegister.onclick = function() {
    registerModal.style.display = "none";
}

// Quando o usuário clica em qualquer lugar fora do modal, fecha os modais
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
}

// Slider logic
let slideIndex = 0;
const slides = document.querySelector('.slides');

function showSlide(index) {
    const totalSlides = document.querySelectorAll('.slide').length;
    if (index >= totalSlides) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = totalSlides - 1;
    } else {
        slideIndex = index;
    }
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

function moveSlide(n) {
    showSlide(slideIndex + n);
}

document.addEventListener('DOMContentLoaded', function () {
    showSlide(slideIndex);
});