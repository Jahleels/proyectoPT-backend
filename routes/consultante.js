const express = require('express');
const router = express.Router();

const ConsultanteController = require('../controllers/ConsultanteController')

router.post('/add', ConsultanteController.add);
router.get('/list', ConsultanteController.list);
router.get('/query', ConsultanteController.query);
router.put('/update', ConsultanteController.update);
router.put('/enabled', ConsultanteController.enabled);
router.put('/disabled', ConsultanteController.disabled);

// Exportamos la configuración de express app
module.exports = router;