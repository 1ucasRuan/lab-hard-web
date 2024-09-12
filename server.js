require('dotenv').config(); // Para usar variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Feedback = require('./models/feedback');

const app = express();
const PORT = process.env.PORT || 3000; // Porta como variável de ambiente
const JWT_SECRET = process.env.JWT_SECRET; // Segredo JWT como variável de ambiente

// Middlewares
app.use(express.json());
app.use(cors());

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/labhard')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Rota de Registro
app.post('/register', async (req, res) => {
    const { firstName, email, registrationNumber, currentPeriod, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já cadastrado' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            email,
            registrationNumber,
            currentPeriod,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

// Rota de Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        // Não envie a senha para o cliente
        const token = jwt.sign({ id: user._id, firstName: user.firstName }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, firstName: user.firstName });

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

// Rota para atualizar usuário
app.put('/update', authMiddleware, async (req, res) => {
    const { firstName, email, registrationNumber, currentPeriod } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, email, registrationNumber, currentPeriod },
            { new: true }
        );

        res.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

// Rota para obter informações do usuário
app.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({
            firstName: user.firstName,
            email: user.email,
            registrationNumber: user.registrationNumber,
            currentPeriod: user.currentPeriod
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

// Rota para enviar feedback testando
app.post('/feedback', async (req, res) => {
    const { name, email, message, userId } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const newFeedback = new Feedback({
            name,
            email,
            message,
            userId
        });

        await newFeedback.save();
        res.status(201).json({ message: 'Feedback enviado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao enviar feedback', error });
    }
});


// Servidor escutando
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});