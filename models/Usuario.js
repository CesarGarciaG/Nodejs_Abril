'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    clave: {
        type: String,
        required: true
    }
});

mongoose.model('Usuario', usuarioSchema);
