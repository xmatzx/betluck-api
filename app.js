'use strict';

var express = require('express');
var app = express();

const API_PORT = process.env.PORT || 3000;

require('./app/routes/index')(app);

app.listen(API_PORT, function () {
    console.log('App listening on port :'+API_PORT);
});