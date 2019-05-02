const {body} = require('express-validator/check'),
    competitionValidator = {};

competitionValidator.validate = (req, method) => {
    switch (method) {
        case 'create': {
            req.checkBody('name', 'Invalid: min 5 chars.').exists().isLength({min: 5});
            req.checkBody('year').exists().isInt({gt: 1970, lt: 2050});
        }
            break;

        case 'update': {
            req.checkParams('id').exists();
            req.checkBody('name', 'Invalid: min 5 chars.').optional().isLength({min: 5});
            req.checkBody('year').optional().isInt({gt: 1970, lt: 2050});
        }
            break;
    }
};

module.exports = competitionValidator;