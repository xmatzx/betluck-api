var _           = require('lodash'),
    fs          = require('fs'),
    excluded    = ['index.js'];

module.exports = function (app, passport) {
    fs.readdirSync(__dirname).forEach(function (file) {
        // remove extension from file name
        var basename = file.split('.')[0];

        // only load files that aren't directories and aren't blacklisted
        if (!fs.lstatSync(__dirname + '/' + file).isDirectory() && !_.includes(excluded, file)) {
            app.use('/' + basename, require('./' + file)(passport));
        }
    });
};