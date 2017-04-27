'use strict';

const Localize = require('localize');

module.exports = new Localize({

    // Mensajes de error de credenciales
    'User not found': {
        'es': 'Usuario no encontrado'
    },
    'Wrong password': {
        'es': 'Contraseña incorrecta'
    },
    'Not found': {
        'es': 'No encontrado'
    },
    'Authentication token not found': {
        'es': 'Token de autenticación no encontrado'
    },
    'Invalid token': {
        'es': 'Invalid token'
    },

    // Mensajes de inicialización de BD
    'Unable to reset DB': {
        'es': 'No se ha podido resetear la BD'
    },
    'Unable to read file': {
        'es': 'No se ha podido leer el fichero'
    },
    'Unable to initialize DB': {
        'es': 'Error al inicializar BD'
    },
    'DB initialized succesfully!': {
        'es': '¡BD inicializada con éxito!'
    },

    // Mensajes de conexión con MongoDB
    'MongoDB connection error': {
        'es': 'Error de conexión con MongoDB'
    },
    'Connected to MongoDB!': {
        'es': '¡Conectao a MongoDB!'
    },

    // Mensajes varios
    'No ads were found with this criteria': {
        'es': 'No se han encontrado anuncios con estos criterios.'
    }
});
