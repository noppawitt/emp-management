const db = require('../db');
const moment = require('moment');

const Project = {};

Project.create = (project, id) => (
  db.one(
    'INSERT INTO projects (id, name, description, customer, quatation_id, purchased_order, amount, from, to, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING 1',
    [
      project.id,
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
    'UPDATE projects SET id = $1, name = $2, description = $3, customer = $4, quatation_id = $5, purchased_order = $6, amount = $7, from = $8, to = $9, updated_user = $10, updated_date = $11, status = $12 WHERE id = $13',
    [
      project.id,
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

Project.findById = id => (
  db.one('SELECT * FROM projects WHERE id = $1', [id])
);

Project.findMemberProject = id => (
  db.manyOrNone('SELECT has_projects.user_id, employee_info.first_name, employee_info.last_name, employee_work.position, has_projects.role FROM has_projects, employee_info, employee_work WHERE has_projects.user_id = employee_info.user_id AND has_projects.user_id = employee_work.user_id AND has_projects.id = $1', [id])
);

module.exports = Project;
