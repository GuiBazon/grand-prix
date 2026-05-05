const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secreta_super_segura_iap';

const verificarToken = (req, res, next) => {
  const tokenHeader = req.headers['authorization'];

  if (!tokenHeader) {
    return res.status(403).json({ success: false, message: 'Nenhum token fornecido.' });
  }

  // O token geralmente vem no formato "Bearer TOKEN"
  const token = tokenHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token malformado.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token inválido ou expirado.' });
    }
    
    // Salva o usuário decodificado no request para as próximas rotas
    req.usuarioId = decoded.id;
    req.usuarioPerfil = decoded.perfil;
    next();
  });
};

const verificarPerfil = (perfisPermitidos) => {
  return (req, res, next) => {
    if (!req.usuarioPerfil || !perfisPermitidos.includes(req.usuarioPerfil)) {
      return res.status(403).json({ success: false, message: 'Acesso negado: Perfil sem permissão.' });
    }
    next();
  };
};

module.exports = {
  verificarToken,
  verificarPerfil
};
