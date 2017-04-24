'use strict';

require('../models/Anuncio.js');
require('./connectMongoose.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Importamos la librería de promesas nativa de Mongoose (not deprecated)
const Anuncio = mongoose.model('Anuncio');

const fileSys = require('fs');

Anuncio.deleteAll((err) => {
    if (err) {
        return new Error('Error al eliminar las entradas de la BD');
    }
    return;
});

fileSys.readFile('./lib/anuncios.json', 'utf-8', (err, datos) => {
    if (err) {
        return new Error('Error al leer el fichero');
    }

    const listAnuncios = JSON.parse(datos);
    Anuncio.initialize(listAnuncios.anuncios, (err) => {
        if (err) {
            return new Error('Error al inicializar BD');
        }
    });
    return console.log('BD inicializada!');
});
