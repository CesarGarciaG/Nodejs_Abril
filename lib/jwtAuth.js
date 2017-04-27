'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config.js');

// Importamos los módulos de localización
const traductor = require('../lib/localization.js');

// Exportamos un middleware de autenticación
module.exports = (req, res, next) => {

    // Recogemos el token jwt
    const token = req.body.token || req.query.token || req.get('x-access-token');
    // Si no nos llega el token, responder "no autorizado"
    if (!token) {
        const error = new Error(traductor.translate('Authentication token not found'));
        error.status = 401;
        next(error);
        return;
    }
    // Validar el token
    jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
        // Si el token ha sido modificado o ha expirado
        if (err) {
            const error = new Error(traductor.translate('Invalid token'));
            error.status = 401;
            return next(error);
        }
        // El token es correcto
        req.usuario_id = decodedToken.usuario_id;
        next();
    });
};
