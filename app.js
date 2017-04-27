'use strict';

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Importamos los módulos de localización
require('localize');
const traductor = require('./lib/localization.js');

// Conectamos a la base de datos y cargamos los modelos
require('./lib/connectMongoose.js');
require('./models/Anuncio.js');
require('./models/Usuario.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Ruta para mostrar imágenes
app.use('/nodepop/images/anuncios', express.static(path.join(__dirname, '/public/images/')))


// Habilitamos CORS (Cross-Origin Resource Sharing)
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Rutas de la aplicación
app.use('/nodepop', require('./routes/index.js'));
app.use('/nodepop/login', require('./routes/login.js'));
app.use('/nodepop/anuncios', require('./routes/apipop/anuncios.js'));
app.use('/nodepop/usuarios', require('./routes/apipop/usuarios.js'));

// Localization
app.use(function(req, res, next) {
    // const lang = req.session.lang || 'es';
    traductor.setLocale('es');
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error(traductor.translate('Not found'));
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    next();
});

module.exports = app;
