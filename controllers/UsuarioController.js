const models = require('../models');
const bcrypt = require('bcrypt');
const token = require('../services/token')

module.exports = {

    // agregar un nuevo usuario
    add: async (req, res, next) => {
        try {
            let checkEmail = await models.Usuario.findOne({
                correo: req.body.correo
            });
            if (checkEmail) {
                res.status(404).send({
                    message: 'El usuario ya existe'
                })
            } else {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                const reg = await models.Usuario.create(req.body);
                res.status(200).json(reg);
            }

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next();
        }
    },

    // consultar un usuario
    query: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findOne({
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

    // listar todos los usuarios
    list: async (req, res, next) => {
        try {
            const reg = await models.Usuario.find({
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

    // modificar algún dato del usuario
    update: async (req, res, next) => {
        try {
            // console.log(req.body);
            let auxPassword = req.body.password;
            console.log("aux", auxPassword);
            const auxReg = await models.Usuario.findOne({ correo: req.body.correo });
            if (auxPassword !== auxReg.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.Usuario.updateOne({ correo: req.body.correo }, {
                rol: req.body.rol,
                nombre: req.body.nombre,
                password: req.body.password
            });
            res.status(200).json(reg);

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    // activar un usuario
    enabled: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    // desactivar un usuario
    disabled: async (req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { estado: 0 });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    //login del usuario
    login: async (req, res, next) => {
        try {
            // console.log(req.body.correo)
            let user = await models.Usuario.findOne(
                {
                    correo: req.body.correo,
                    estado: 1
                }
            );
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    console.log(user);
                    const tokenReturn = await token.encode(user);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(401).send({
                        message: 'Password Incorrecto'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'El usuario no existe o esta inactivo'
                });
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}

