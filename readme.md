# 🚀 All About TiD - Site Pessoal com Login

![Badge de Status](https://img.shields.io/badge/status-online-green)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Vercel](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 📋 Sobre o Projeto

Site pessoal "All About TiD" com sistema de **autenticação completa** (registro e login). Após fazer login, o usuário acessa uma página personalizada com conteúdo sobre música, projetos e pensamentos.


## 💻 Acesso ao projeto

Para ter acesso ao projeto, você pode acessar por esse link: https://meu-caderno-site-g67q-4y4ced84x-thaua-tid.vercel.app/login


## 🎯 Funcionalidades

- ✅ Cadastro de novos usuários
- ✅ Login com email e senha
- ✅ Proteção de rotas (só acessa a Home se estiver logado)
- ✅ Criptografia de senhas com bcrypt
- ✅ Autenticação com JWT (JSON Web Token)
- ✅ Design personalizado com fonte Inconsolata
- ✅ Player de música integrado (SoundCloud)
- ✅ Menus dropdown interativos
- ✅ Logout com limpeza de sessão

## 🛠️ Tecnologias Utilizadas

### Frontend (Vercel)
- React.js - Biblioteca para interfaces
- React Router DOM v6 - Navegação entre páginas
- Axios - Requisições HTTP
- CSS Puro - Estilização personalizada

### Backend (Render)
- Node.js - Ambiente de execução
- Express - Framework web
- Mongoose - Conexão com MongoDB
- Bcryptjs - Criptografia de senhas
- JsonWebToken - Tokens de autenticação

### Banco de Dados (MongoDB Atlas)
- MongoDB - Banco NoSQL na nuvem

## 📁 Estrutura do Projeto
meu-site-completo/
├── backend/ # Servidor Node.js
│ ├── models/
│ │ └── User.js # Modelo do usuário
│ ├── routes/
│ │ └── auth.js # Rotas de autenticação
│ ├── index.js # Arquivo principal do servidor
│ ├── .env # Variáveis de ambiente
│ └── package.json
├── frontend/ # Aplicação React
│ ├── public/
│ │ └── img/ # Imagens do site
│ ├── src/
│ │ ├── components/
│ │ │ ├── Login.js # Tela de login
│ │ │ ├── Login.css # Estilo do login
│ │ │ ├── Register.js # Tela de registro
│ │ │ ├── Home.js # Página principal
│ │ │ └── Home.css # Estilo da Home
│ │ ├── App.js # Configuração de rotas
│ │ └── App.css # Estilos globais
│ ├── .env # URL da API
│ └── package.json
├── .gitignore # Arquivos ignorados pelo Git
└── README.md # Este arquivo

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js instalado
- MongoDB instalado localmente OU conta no MongoDB Atlas
- Git instalado

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/Thauamarcelo/meu-caderno-site.git

# 2. Entre na pasta
cd meu-caderno-site

# 3. Configure o backend
cd backend
npm install


Crie um arquivo .env na pasta backend com:

MONGODB_URI=mongodb://localhost:27017/Users
JWT_SECRET=sua_chave_secreta
PORT=5000

# 4. Inicie o backend (Terminal 1)
npm run dev

# 5. Configure o frontend (Terminal 2)
cd ../frontend
npm install


Crie um arquivo .env na pasta frontend com:
REACT_APP_API_URL=http://localhost:5000


# 6. Inicie o frontend
npm start

Acesse: http://localhost:3000

🌐 Deploy (Produção)

Serviço	        URL
Frontend	    Vercel
Backend	        Render
Banco_de_Dados	MongoDB Atlas

🔐 Segurança

- Senhas criptografadas com bcrypt (10 rounds de salt)

- Autenticação via JWT com expiração de 7 dias

- Rotas protegidas no frontend (verificação de token)

- Variáveis de ambiente para dados sensíveis

- .env e node_modules no .gitignore

📝 Aprendizados

Durante o desenvolvimento deste projeto, aprendi:

- Criar um servidor com Node.js e Express

- Conectar ao MongoDB usando Mongoose

- Criptografar senhas com bcrypt

- Gerar tokens JWT para autenticação

- Criar componentes reutilizáveis no React

- Gerenciar estados com useState

- Navegação com React Router DOM

- Fazer deploy no Render e Vercel

- Configurar variáveis de ambiente

- Resolver erros de build e CORS

🔮 Melhorias Futuras

- Página de perfil do usuário

- Recuperação de senha por email

- Upload de avatar

- Modo escuro (dark mode)

- Conteúdo real nas páginas dos menus

- Responsividade para mobile

- Testes automatizados

👤 Autor
- Thauã Marcelo -

- GitHub: @Thauamarcelo

📄 Licença
Este projeto é para fins educacionais. Sinta-se livre para usar e modificar.
