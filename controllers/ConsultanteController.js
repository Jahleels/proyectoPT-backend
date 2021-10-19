const models = require('../models');
const bcrypt = require('bcrypt');
const token = require('../services/token')

module.exports = {

    // agregar un nuevo Consultante
    add: async (req, res, next) => {
        try {
            let checkEmail = await models.Consultante.findOne({
                correo: req.body.correo
            });
            if (checkEmail) {
                res.status(404).send({
                    message: 'El Consultante ya existe'
                })
            } else {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                const reg = await models.Consultante.create(req.body);
                res.status(200).json(reg);
            }

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next();
        }
    },

    // consultar un Consultante
    query: async (req, res, next) => {
        try {
            const reg = await models.Consultante.findOne({
                correo: req.query.correo
            })
            if (reg) {
                res.status(200).json(reg)
            } else {
                res.status(404).send({
                    message: 'No encontrado'
                })
            }

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    // listar todos los Consultantes
    list: async (req, res, next) => {
        try {
            const reg = await models.Consultante.find({
                $or: [{ 'nombre': new RegExp(req.query.valor, 'i') },
                { 'correo': new RegExp(req.query.valor, 'i') }, { 'rol': new RegExp(req.query.valor, 'i') }]
            },
                { createdAt: 0, __v: 0 }).sort({ 'createdAt': 1 })
            res.status(200).json(reg)

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error interno, intente de nuevo mas tarde'
            });
            next(error);
        }
    },

    // modificar algún dato del Consultante
    update: async (req, res, next) => {
        try {
            // console.log(req.body);
            let auxPassword = req.body.password;
            console.log("aux", auxPassword);
            const auxReg = await models.Consultante.findOne({ correo: req.body.correo });
            if (auxPassword !== auxReg.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.Consultante.updateOne({ correo: req.body.correo }, {
                nombre: req.body.nombre,
            });
            res.status(200).json(reg);

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    // activar un Consultante
    enabled: async (req, res, next) => {
        try {
            const reg = await models.Consultante.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    // desactivar un Consultante
    disabled: async (req, res, next) => {
        try {
            const reg = await models.Consultante.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
}

