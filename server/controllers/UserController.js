const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');

exports.findAll = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};

exports.create = (req, res, next) => {
  const newUser = req.body.user;
  User.findByUsername(newUser.username)
    .then((user) => {
      if (user) {
        const err = new Error('User already exist');
        err.status = 409;
        next(err);
      }
      else {
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync());
        User.create(newUser, req.user.id)
          .then((createdUser) => {
            res.json(createdUser);
          })
          .catch(next);
      }
    })
    .catch(next);
};
