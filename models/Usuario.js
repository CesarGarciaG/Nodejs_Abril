'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {
        type: String,
        unique: true
    },
    clave: String
});

// Creamos el modelo de Agente (con hoisting para usarlo en los métodos de aquí arriba)
var Usuario = mongoose.model('Usuario', usuarioSchema);
