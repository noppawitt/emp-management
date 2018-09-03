const db = require('../db');
const moment = require('moment');

const Degree = {};

Degree.create = (degree, id) => (
  db.one(
    'INSERT INTO degrees (name, description, created_user, updated_user) VALUES ($1, $2, $3, $4) RETURNING id',
    [
      degree.name,
      degree.description,
      id,
      id
    ]
  )
);

Degree.update = (degree, id) => (
  db.one(
    'UPDATE degrees SET name = $1, description = $2, updated_user = $3, updated_date = $4 WHERE id = $5',
    [
      degree.name,
      degree.description,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      degree.id
    ]
  )
);

Degree.findById = id => (
  db.oneOrNone('SELECT * FROM degrees WHERE id = $1', [id])
);

Degree.findAll = () => (
  db.manyOrNone('SELECT * FROM degrees')
);

Degree.delete = id => (
  db.none('DELETE FROM degrees WHERE id = $1', [id])
);

module.exports = Degree;
