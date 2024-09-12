const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");
const userNameDisplay = document.getElementById("user-name");
const logoutBtn = document.getElementById('logoutBtn');
const profiletBtn = document.getElementById('profiletBtn');

// Abrir modal de login
loginBtn.onclick = function () {
    loginModal.style.display = "block";
}

// Abrir modal de cadastro
registerBtn.onclick = function () {
    registerModal.style.display = "block";
}

// Fechar modal de login
closeLogin.onclick = function () {
    loginModal.style.display = "none";
}

// Fechar modal de cadastro
closeRegister.onclick = function () {
    registerModal.style.display = "none";
}

// Fechar modal clicando fora dele
window.onclick = function (event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
}

// Função para registrar usuário
document.getElementById('registerForm').onsubmit = async function (event) {
    event.preventDefault();
    const firstName = document.getElementById('registerFirstName').value;
    const email = document.getElementById('registerEmail').value;
    const registrationNumber = document.getElementById('registerRegistrationNumber').value;
    const currentPeriod = document.getElementById('registerCurrentPeriod').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        return;
    }

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, email, registrationNumber, currentPeriod, password })
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        registerModal.style.display = 'none';
    } else {
        alert(result.message);
    }
}

// Função para logar usuário
document.getElementById('loginForm').onsubmit = async function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
        // Armazene o token e o nome no localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('firstName', result.firstName);

        showUserName(result.firstName);
        loginModal.style.display = 'none';
    } else {
        alert(result.message);
    }
}

// Função para mostrar o nome do usuário e o botão de logout
function showUserName(firstName) {
    userNameDisplay.textContent = `Olá, ${firstName}`;
    userNameDisplay.style.display = 'block';
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'block'; // Mostrar botão de logout
    profiletBtn.style.display = 'block'; // Mostrar botão de perfil
}

// Função para fazer logout
logoutBtn.onclick = function () {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    userNameDisplay.style.display = 'none';
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    profiletBtn.style.display = 'none';
};

// Verificar se o usuário já está logado ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName');

    if (token && firstName) {
        showUserName(firstName);
    }
});

// Slider pagina inicial
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