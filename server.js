const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'seu_segredo_jwt'; // Segredo para geração do token JWT

// Middlewares
app.use(express.json());
app.use(cors());

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/labhard', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Rota de Registro
app.post('/register', async (req, res) => {
    const { firstName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            email,
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


// Servidor escutando
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
