const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/competition');

module.exports = function (passport) {
    router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);

    router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getOne);

    router.put('/:id', passport.authenticate('jwt', {session: false}), controller.update);

    router.post('/', passport.authenticate('jwt', {session: false}), controller.create);

    return router;
};