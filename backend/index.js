// 1. carrega variaveis de ambiente
require('dotenv').config();

// 2.Importar as ferramentas
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// 3. Cria o aplicativo Express
const app = express();

// 4. Configura middlewares (intermediários)
app.use(cors());               //Permite requisição do frontend
app.use(express.json());       //Formatar o corpo da requisição como JSON

// 5. Conecta ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,  // Aumentado para 30 segundos
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000
})
  .then(() => console.log('📦 Conectado ao MongoDB!'))
  .catch(err => console.error(' Erro ao conectar ao MongoDB:', err));

// 6. Usa as rotas
app.use('/api/auth', authRoutes);

// 7. Rota de teste
app.get('/', (req, res) => {
    res.json({message: 'Bem-vindo à API de autenticação!'});
});

// 8. inicia o servidor
// IMPORTANTE: Render define a porta automaticamente via process.env.PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});