const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/user');

module.exports = function (passport) {
    router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);

    router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getOne);

    router.put('/:id', passport.authenticate('jwt', {session: false}), controller.update);

    return router;
};