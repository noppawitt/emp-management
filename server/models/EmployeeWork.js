const db = require('../db');
const moment = require('moment');

const EmployeeWork = {};

EmployeeWork.create = (employeeWork, id) => (
  db.one(
    'INSERT INTO employee_work (user_id, department_id, contract_id, position_id, level_id, created_user, updated_user, start_date, probation_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING 1',
    [
      employeeWork.user_id,
      employeeWork.department_id,
      employeeWork.contract_id,
      employeeWork.position_id,
      employeeWork.level_id,
      id,
      id,
      employeeWork.start_date,
      employeeWork.probation_date,
      employeeWork.end_date
    ]
  )
);

EmployeeWork.update = (employeeWork, id) => (
  db.one(
    'UPDATE employee_work SET department_id = $1, contract_id = $2, position_id = $3, level_id = $4, updated_user = $5, start_date = $6, probation_date = $7, end_date = $8, updated_date = $9 WHERE user_id = $10',
    [
      employeeWork.department_id,
      employeeWork.contract_id,
      employeeWork.position_id,
      employeeWork.level_id,
      id,
      employeeWork.start_date,
      employeeWork.probation_date,
      employeeWork.end_date,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      employeeWork.user_id
    ]
  )
);

EmployeeWork.findById = id => (
  db.oneOrNone('SELECT * FROM employee_work WHERE user_id = $1', [id])
);

module.exports = EmployeeWork;
