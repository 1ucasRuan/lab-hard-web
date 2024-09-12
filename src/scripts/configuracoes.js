document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'inicio.html'; // Redirecionar para a página inicial
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao obter dados do usuário');
        }

        const result = await response.json();

        // Preencher o formulário com os dados atuais
        document.getElementById('updateFirstName').value = result.firstName || null;
        document.getElementById('updateEmail').value = result.email || null;
        document.getElementById('updateRegistrationNumber').value = result.registrationNumber || null;
        document.getElementById('updateCurrentPeriod').value = result.currentPeriod || null;
    } catch (error) {
        alert(error.message);
        //window.location.href = 'inicio.html'; // Redirecionar para a página inicial em caso de erro
    }
});

document.getElementById('settingsForm').onsubmit = async function (event) {
    event.preventDefault();

    const firstName = document.getElementById('updateFirstName').value;
    const email = document.getElementById('updateEmail').value;
    const registrationNumber = document.getElementById('updateRegistrationNumber').value;
    const currentPeriod = document.getElementById('updateCurrentPeriod').value;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:3000/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName, email, registrationNumber, currentPeriod })
        });

        if (!response.ok) {
            throw new Error('Falha ao atualizar dados do usuário');
        }

        const result = await response.json();
        alert(result.message);
        window.location.href = 'inicio.html'; // Redirecionar de volta para a página inicial após sucesso
    } catch (error) {
        alert(error.message);
    }
};

//Enviando feedeback testando
document.getElementById('feedbackForm').onsubmit = async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const userId = localStorage.getItem('userId'); // Pegue o ID do usuário de onde for armazenado

    try {
        const response = await fetch('http://localhost:3000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message, userId })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar feedback:', error);
        alert('Ocorreu um erro ao enviar seu feedback.');
    }
};
