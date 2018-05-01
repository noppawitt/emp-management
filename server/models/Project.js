const db = require('../db');
const moment = require('moment');

const Project = {};

Project.create = (project, id) => (
  db.one(
    'INSERT INTO projects (name, description, customer, quatation_id, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING 1',
    [
      project.name,
      project.description,
      project.customer,
      project.quatationId,
      id,
      id
    ]
  )
);

Project.update = (project, id) => (
  db.one(
    'UPDATE projects SET name = $1, description = $2, customer = $3, quatationId = $4, updated_user = $5, updated_date = $6 WHERE id = $7',
    [
      project.name,
      project.description,
      project.customer,
      project.quatationId,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      project.id
    ]
  )
);

Project.findAll = () => (
  db.manyOrNone('SELECT * FROM projects')
);

module.exports = Project;
