'use strict';

var express = require('express');
var router = express.Router();

/* GET /nodepop/login */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Nodepop' });
    next();
});

module.exports = router;
