'use strict';

// Importamos el router
const express = require('express');
const router = express.Router();

// Le pedimos a mongoose el modelo de Anuncio
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

// JSON Web Token
const jwtAuth = require('../../lib/jwtAuth.js');
router.use(jwtAuth);

// GET /nodepop/anuncios
router.get('/', (req, res, next) => {

    // Recogemos parámetros de búsqueda
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
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
        const num = precio.split('-');
        console.log('num:', num);
        if (precio.charAt(0) === '-') {
            criterios.precio = { '$lte': num[1] };
        } else if (precio.charAt(precio.length - 1) === '-') {
            criterios.precio = { '$gte': num[0] };
        } else if (precio.search('-') === -1) {
            criterios.precio = precio;
        } else {
            criterios.precio = { '$gte': num[0], '$lte': num[1] };
        }
        // if (precio === '10-50') {
        //     criterios.precio = { '$gte': '10', '$lte': '50' };
        // } else if (precio === '10-') {
        //     criterios.precio = { '$gte': '10' };
        // } else if (precio === '-50') {
        //     criterios.precio = { '$lte': '50' };
        // } else
        //     criterios.precio = precio;
    }
    if (tags) {
        criterios.tags = tags;
    }

    console.log(criterios);

    // Recuperamos la lista de anuncios
    Anuncio.list(criterios, limit, skip, select, sort, (err, anuncios) => {
        if (err) {
            return next(err);
        }
        if (!anuncios) {
            res.json({ success: true, resultado: 'No ads were found with these criteria.' });
        } else {
            res.json({ success: true, resultado: anuncios });
        }
    });
});

// GET /nodepop/anuncios/tags
router.get('/tags', (req, res, next) => {
    // Recuperamos la lista de anuncios por tags
    Anuncio.list(null, null, null, 'tags', null, (err, anuncios) => {
        if (err) {
            return next(err);
        }
        const tags = {};
        console.log(anuncios);
        for (let i in anuncios) {
            for (let j = 0; j < anuncios[i].tags.length; j++) {
                if (anuncios[i].tags[j] === 'lifestyle') {
                    tags.lifestyle = true;
                } else if (anuncios[i].tags[j] === 'mobile') {
                    tags.mobile = true;
                } else if (anuncios[i].tags[j] === 'motor') {
                    tags.motor = true;
                } else if (anuncios[i].tags[j] === 'work') {
                    tags.work = true;
                }
            }
        }
        res.json({ success: true, resultado: tags });
    });
});


module.exports = router;
