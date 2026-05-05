const express = require('express');
const router = express.Router();
const demandasController = require('../controllers/demandas.controller');
const { verificarToken, verificarPerfil } = require('../middlewares/auth.middleware');

// Todas as rotas de demandas exigem autenticação
router.use(verificarToken);

router.get('/', demandasController.listarDemandas);
router.post('/', demandasController.criarDemanda);

// Apenas perfis com permissão podem alterar o status
router.patch('/:id/status', verificarPerfil(['gestor', 'rh', 'admin']), demandasController.atualizarStatus);

module.exports = router;
