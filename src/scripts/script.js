const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");
const userNameDisplay = document.getElementById("user-name");

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
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, email, password })
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

// Função para mostrar o nome do usuário e esconder os botões de login/cadastro
function showUserName(firstName) {
    userNameDisplay.textContent = `Olá, ${firstName}`;
    userNameDisplay.style.display = 'block';
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
}

// Verificar se o usuário já está logado ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName');

    if (token && firstName) {
        showUserName(firstName);
    }
});