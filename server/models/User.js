const db = require('../db');

const User = {};

User.create = user => (
  db.one(
    'INSERT INTO users (id, username, password, created_user, updated_user, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username',
    [user.id, user.username, user.password, 1, 1, 'admin']
  )
);

User.findById = id => (
  db.oneOrNone('SELECT * FROM users WHERE id = $1', [id])
);

User.findByUsername = username => (
  db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])
);

module.exports = User;
