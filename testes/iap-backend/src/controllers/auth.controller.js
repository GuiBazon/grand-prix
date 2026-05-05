const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'secreta_super_segura_iap';

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'E-mail ou senha incorretos' });
    }

    const usuario = rows[0];
    
    // Aceitando a senha mestre '123456' para todos os perfis durante o teste, ou o hash
    const senhaValidaBcrypt = await bcrypt.compare(password, usuario.senha).catch(() => false);
    const isMasterPassword = password === '123456';
    const senhaValidaTexto = password === usuario.senha;

    if (!senhaValidaBcrypt && !senhaValidaTexto && !isMasterPassword) {
      return res.status(401).json({ success: false, message: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Remove a senha do objeto de retorno
    delete usuario.senha;

    res.json({ success: true, token, user: usuario });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor.' });
  }
};

module.exports = {
  login
};
