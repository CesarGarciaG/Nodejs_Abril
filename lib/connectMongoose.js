'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Importamos la librería de promesas nativa de Mongoose (not deprecated)
const conexion = mongoose.connection;

// Creamos los eventos de conexión
conexion.on('err', (err) => {
    console.log('MongoDB connection error', err);
    process.exit(1);
});

conexion.once('open', () => {
    console.log('Connected to MongoDB!');
});

// Realizamos la conexión
mongoose.connect('mongodb://localhost:27017/nodepop');


// No necesitamos exportar la conexión ya que Mongoose 
// la gestiona por nosotros
