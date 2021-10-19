const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController')

router.post('/add', UsuarioController.add);
router.get('/list', UsuarioController.list);
router.get('/query', UsuarioController.query);
router.put('/update', UsuarioController.update);
router.put('/enabled', UsuarioController.enabled);
router.put('/disabled', UsuarioController.disabled);

router.post('/login', UsuarioController.login);


// Exportamos la configuración de express app
module.exports = router;