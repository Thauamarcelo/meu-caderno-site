const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const crypto = require('crypto');

// ROTA 1: REGISTRAR NOVO USUÁRIO
router.post('/registrar', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar se usuário ou email já existe
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Usuário ou email já cadastrado'
            });
        }

        // Criptografar a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Criar novo usuário com senha criptografada
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        
        await user.save();

        // Gerar token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Resposta de sucesso
        res.status(201).json({
            message: 'Usuário registrado com sucesso',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ message: error.message });
    }
});

// ROTA 2: LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuário pelo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Email ou senha incorretos'
            });
        }

        // Verificar senha
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Email ou senha incorretos'
            });
        }

        // Gerar token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Login bem sucedido
        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: error.message });
    }
});

// ROTA 3: SOLICITAR REDEFINIÇÃO DE SENHA
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.json({ 
                message: 'Se o email existir, um link será enviado.' 
            });
        }

        // Gerar token aleatório
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Salvar no usuário com expiração de 1 hora
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        console.log('Link de redefinição:', `http://localhost:3000/reset-password/${resetToken}`);

        res.json({
            message: 'Se o email existir, um link de redefinição será enviado.',
            resetToken: resetToken  // Em produção: REMOVER e enviar por email
        });

    } catch (error) {
        console.error('Erro ao solicitar redefinição:', error);
        res.status(500).json({ message: error.message });
    }
});

// ROTA 4: REDEFINIR SENHA COM TOKEN
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Token inválido ou expirado.'
            });
        }

        // Criptografar nova senha
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        // Limpar token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();

        res.json({
            message: 'Senha redefinida com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;