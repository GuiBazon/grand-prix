const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const demandasRoutes = require('./routes/demandas.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/demandas', demandasRoutes);

// Rota de status
app.get('/api/status', (req, res) => {
  res.json({ status: 'API rodando perfeitamente com nova estrutura! 🚀', versao: '2.0.0' });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erro interno no servidor!' });
});

module.exports = app;
