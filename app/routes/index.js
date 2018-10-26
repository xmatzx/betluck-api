const _ = require('lodash'),
    fs = require('fs'),
    excluded = ['index.js'],
    privates = ['game.js', 'user.js', 'team.js'];

module.exports = function (app, passport) {
    fs.readdirSync(__dirname).forEach(function (file) {
        // remove extension from file name
        const basename = file.split('.')[0];

        // only load files that aren't directories and aren't blacklisted
        if (!fs.lstatSync(__dirname + '/' + file).isDirectory() && !_.includes(excluded, file)) {
            if (_.includes(privates, file)) {
                app.use('/' + basename, require('./' + basename)(passport));
            } else {
                app.use('/' + basename, require('./' + basename));
            }
        }
    });
};