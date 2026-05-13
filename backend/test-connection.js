require('dotenv').config();
const mongoose = require('mongoose');

console.log('Tentando conectar com:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000
})
.then(() => {
  console.log('✅ CONEXÃO BEM SUCEDIDA!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ ERRO:', err.message);
  process.exit(1);
});