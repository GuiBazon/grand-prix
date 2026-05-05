const pool = require('../config/db');

// Listar demandas (com filtro por usuário e perfil)
const listarDemandas = async (req, res) => {
  try {
    const { usuarioId, usuarioPerfil } = req;
    
    let query = `
      SELECT d.*, u.nome as usuario_nome 
      FROM demandas d 
      JOIN usuarios u ON d.usuario_id = u.id
    `;
    let params = [];

    // Se for funcionário, vê apenas as próprias
    if (usuarioPerfil === 'funcionario') {
      query += ' WHERE d.usuario_id = ?';
      params.push(usuarioId);
    }
    // Gestor, RH e Admin veem todas

    query += ' ORDER BY d.criado_em DESC';

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Erro ao listar demandas:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor.' });
  }
};

// Criar demanda
const criarDemanda = async (req, res) => {
  try {
    const { usuarioId } = req;
    const { titulo, descricao, tipo, prioridade, localizacao, anexo_url } = req.body;

    const [result] = await pool.query(
      `INSERT INTO demandas (usuario_id, titulo, descricao, tipo, prioridade, localizacao, anexo_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [usuarioId, titulo, descricao, tipo, prioridade || 'Média', localizacao, anexo_url]
    );

    res.status(201).json({ success: true, message: 'Demanda criada com sucesso.', id: result.insertId });
  } catch (error) {
    console.error('Erro ao criar demanda:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar demanda.' });
  }
};

// Atualizar status (apenas RH/Gestor/Admin)
const atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const [result] = await pool.query('UPDATE demandas SET status = ? WHERE id = ?', [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Demanda não encontrada.' });
    }

    res.json({ success: true, message: 'Status atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar demanda:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor.' });
  }
};

module.exports = {
  listarDemandas,
  criarDemanda,
  atualizarStatus
};
