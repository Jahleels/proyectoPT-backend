const express = require('express');
const router = express.Router();

const usuarioRouter = require('./usuario')
const consultanteRouter = require('./consultante')

router.use('/usuario', usuarioRouter);
router.use('/consultante', consultanteRouter);

module.exports = router;