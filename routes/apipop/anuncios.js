'use strict';

// Importamos el router
const express = require('express');
const router = express.Router();

// Le pedimos a mongoose el modelo de Anuncio
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

// GET /apipop/anuncios
router.get('/', (req, res, next) => {

    // Recogemos parámetros de búsqueda
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = parseInt(req.query.precio);
    const foto = req.query.foto;
    const tags = req.query.tags;

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const select = req.query.select;
    const sort = req.query.sort;

    const criterios = {};
    if (nombre) {
        criterios.nombre = new RegExp('^' + nombre, "i");
    }
    if (venta || venta === 'false') {
        criterios.venta = venta
    };
    if (precio) {
        if (precio === '10-50') {
            criterios.precio = { '$gte': '10', '$lte': '50' };
        } else if (precio === '10-') {
            criterios.precio = { '$gte': '10' };
        } else if (precio === '-50') {
            criterios.precio = { '$lte': '50' };
        } else
            criterios.precio = precio;
    }
    if (tags) { criterios.tags = tags };

    console.log(criterios);

    // Recuperamos la lista de anuncios
    Anuncio.list(criterios, limit, skip, select, sort, (err, anuncios) => {
        if (err) {
            return next();
        }
        res.json({ success: true, resultado: anuncios });
    });
});


module.exports = router;
