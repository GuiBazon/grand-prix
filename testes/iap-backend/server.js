require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados (Vamos criar as tabelas no MySQL depois)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'aluno',
  password: process.env.DB_PASSWORD || 'senai@604',
  database: process.env.DB_NAME || 'iap_db'
};

// Rota de teste
app.get('/api/status', (req, res) => {
  res.json({ status: 'API rodando perfeitamente! 🚀', versao: '1.0.0' });
});

// Simulação de rota de login que conectaremos ao React em breve
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT id, nome, email, perfil FROM usuarios WHERE email = ? AND senha = ?',
      [email, password] // Na vida real usaremos bcrypt aqui
    );
    await connection.end();

    if (rows.length > 0) {
      // Retorna os dados do usuário (sucesso)
      res.json({ success: true, user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'E-mail ou senha incorretos' });
    }
  } catch (error) {
    console.error('Erro de banco de dados:', error);
    res.status(500).json({ success: false, message: 'Erro ao conectar no banco de dados. Verifique se o MySQL está rodando.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});
