'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        index: true
    },
    venta: {
        type: Boolean,
        index: true
    },
    precio: {
        type: Number,
        index: true
    },
    foto: String,
    tags: {
        type: [String],
        enum: ['Work', 'Lifestyle', 'Motor', 'Mobile'],
        index: true
    }
});

anuncioSchema.statics.list = function(criterios, limit, skip, select, sort, callback) {
    const query = Anuncio.find(criterios);
    query.limit(limit);
    query.skip(skip);
    query.select(select);
    query.sort(sort);
    query.exec(callback);
};

anuncioSchema.statics.deleteAll = function(callback) {
    Anuncio.remove({}, (err) => {
        if (err) {
            return callback(err);
        }
        callback();
    })
};

anuncioSchema.statics.initialize = function(listAnuncios, callback) {
    for (let i in listAnuncios) {
        const anuncio = new Anuncio({
            nombre: listAnuncios[i].nombre,
            venta: listAnuncios[i].venta,
            precio: listAnuncios[i].precio,
            foto: listAnuncios[i].foto,
            tags: listAnuncios[i].tags
        });
        console.log('Anuncio:', anuncio);
        anuncio.save(callback);
    }
};

// Creamos el modelo de Agente (con hoisting para usarlo en los métodos de aquí arriba)
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
