const db = require('../db');
const moment = require('moment');

const EmployeeWork = {};

EmployeeWork.create = (employeeWork, id) => (
  db.one(
    'INSERT INTO employee_work (user_id, department_id, contract_id, position_id, level_id, created_user, updated_user, start_date, probation_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING 1',
    [
      employeeWork.userId,
      employeeWork.departmentId,
      employeeWork.contractId,
      employeeWork.positionId,
      employeeWork.levelId,
      id,
      id,
      employeeWork.startDate,
      employeeWork.probationDate,
      employeeWork.endDate
    ]
  )
);

EmployeeWork.update = (employeeWork, id) => (
  db.one(
    'UPDATE employee_work SET department_id = $1, contract_id = $2, position_id = $3, level_id = $4, updated_user = $5, start_date = $6, probation_date = $7, end_date = $8, updated_date = $9 WHERE user_id = $10',
    [
      employeeWork.departmentId,
      employeeWork.contractId,
      employeeWork.positionId,
      employeeWork.levelId,
      id,
      employeeWork.startDate,
      employeeWork.probationDate,
      employeeWork.endDate,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      employeeWork.userId
    ]
  )
);

EmployeeWork.findByUserId = userId => (
  db.oneOrNone('SELECT employee_work.user_id, employee_work.department_id, departments.name AS departments_name, employee_work.contract_id, contracts.name AS contracts_name, employee_work.position_id, positions.name AS positions_name, employee_work.level_id, levels.name AS levels_name, employee_work.start_date, employee_work.probation_date, employee_work.end_date FROM employee_work, departments, contracts, positions, levels WHERE employee_work.department_id=departments.id AND employee_work.contract_id=contracts.id AND employee_work.position_id=positions.id AND employee_work.level_id=levels.id AND user_id = $1', [userId])
);

module.exports = EmployeeWork;
