const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/ExamUser');

const jwtSecret = process.env.JWT_SECRET;

exports.signin = (req, res, next) => {
  User.findByUsername(req.body.username)
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            id: user.id,
            username: user.username,
          }, jwtSecret);
          res.json({
            id: user.id,
            username: user.username,
            token,
          });
        }
        else {
          const err = new Error('Incorrect password');
          err.status = 401;
          next(err);
        }
      }
      else {
        const err = new Error('User not found');
        err.status = 404;
        next(err);
      }
    })
    .catch(next);
};
