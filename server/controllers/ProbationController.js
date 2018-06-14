const Probation = require('../models/Probation');

exports.findById = (req, res, next) => {
    Probation.findById(req.query.id)
        .then((users) => {
            res.json(users);
        })
        .catch(next);
};