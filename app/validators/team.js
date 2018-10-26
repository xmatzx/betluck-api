const {body} = require('express-validator/check'),
    teamValidator = {};

teamValidator.validate = (req, method) => {
    switch (method) {
        case 'create': {
            req.checkBody('name', 'Invalid: min 5 chars.').exists().isLength({min: 5});
        }
            break;

        case 'update': {
            req.checkParams('id').exists();
            req.checkBody('name', 'Invalid: min 5 chars.').optional().isLength({min: 5});
            req.checkBody('isActive').optional().isBoolean();
        }
            break;
    }
};

module.exports = teamValidator;