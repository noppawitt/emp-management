const db = require('../db');
const moment = require('moment');

const Project = {};

Project.create = (project, id) => (
  db.one(
    'INSERT INTO projects (name, description, customer, quatation_id, purchased_order, amount, from, to, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING 1',
    [
      project.name,
      project.description,
      project.customer,
      project.quatationId,
      project.purchasedOrder,
      project.amount,
      project.from,
      project.to,
      id,
      id
    ]
  )
);

Project.update = (project, id) => (
  db.one(
    'UPDATE projects SET name = $1, description = $2, customer = $3, quatation_id = $4, purchased_order = $5, amount = $6, from = $7, to = $8, updated_user = $9, updated_date = $10, status = $11 WHERE id = $12',
    [
      project.name,
      project.description,
      project.customer,
      project.quatationId,
      project.purchasedOrder,
      project.amount,
      project.from,
      project.to,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      project.status,
      project.id
    ]
  )
);

Project.findAll = () => (
  db.manyOrNone('SELECT projects.id, projects.name, projects.customer, projects.quatation_id, projects.from, projects.to, projects.status  FROM projects WHERE status = $1', ['In Progress'])
);

module.exports = Project;
