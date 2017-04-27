'use strict';

// Importamos el router
const express = require('express');
const router = express.Router();

// Le pedimos a mongoose el modelo de Usuario
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

// Creamos variables de gestión de credenciales
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
const hash = require('sha.js');
const sha256 = hash('sha256');

// Importamos los módulos de localización
const traductor = require('../../lib/localization.js');

// POST /nodepop/usuarios/login
router.post('/login', (req, res, next) => {
    // Recibimos credenciales
    const email = req.body.email;
    const clave = sha256.update(req.body.clave, 'utf-8').digest('hex');

    // Buscamos el usuario en la base de datos
    Usuario.findOne({ email: email }).exec((err, usuario) => {
        if (err) {
            return next(err);

        }
        if (!usuario) {
            return res.json({ success: false, error: traductor.translate('User not found') });
        }
        // Comprobamos su clave
        if (clave !== usuario.clave) {
            return res.json({ success: false, error: traductor.translate('Wrong password') });
        }
        // Creamos un token JWT (Json Web Token)
        jwt.sign({ usuario_id: usuario._id }, config.jwtSecret, config.jwtConfig,
            (err, token) => {
                if (err) {
                    return next(err);
                }
                // Devolvemos el token
                res.json({ success: true, token: token });
                // res.set('x-access-token', token);
                // res.redirect('http://localhost:3000/nodepop');
            });
    });
});

// POST /nodepop/usuarios/signup
router.post('/signup', (req, res, next) => {
    // Recibimos los datos
    const datos = req.body;
    const user = new Usuario({
        nombre: datos.nombre,
        email: datos.email,
        clave: sha256.update(datos.clave, 'utf-8').digest('hex')
    });
    user.save((err, usuarioGuardado) => {
        if (err) {
            return next(err);
        }
        res.json({ success: true, result: usuarioGuardado });
    });
});

module.exports = router;
