const db = require('../db');
const moment = require('moment');

const EmployeeInfo = {};

EmployeeInfo.create = employeeInfo => (
  db.one(
    'INSERT INTO employee_info (user_id, firstname, lastname, nickname, mobile_number, line_id, email, facebook_id, picture, birthday, citizen_id, created_user, updated_user, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING 1',
    [
      employeeInfo.user_id,
      employeeInfo.firstname,
      employeeInfo.lastname,
      employeeInfo.nickname,
      employeeInfo.mobile_number,
      employeeInfo.line_id,
      employeeInfo.email,
      employeeInfo.facebook_id,
      employeeInfo.picture,
      employeeInfo.birthday,
      employeeInfo.citizen_id,
      1,
      1,
      employeeInfo.address
    ]
  )
);

EmployeeInfo.update = (employeeInfo, id) => (
  db.none(
    'UPDATE employee_info SET firstname = $1, lastname = $2, nickname = $3, mobile_number = $4, line_id = $5, email = $6, facebook_id = $7, picture = $8, birthday = $9, citizen_id = $10, updated_user = $11, address = $12, updated_date = $13 WHERE user_id = $14',
    [
      employeeInfo.firstname,
      employeeInfo.lastname,
      employeeInfo.nickname,
      employeeInfo.mobile_number,
      employeeInfo.line_id,
      employeeInfo.email,
      employeeInfo.facebook_id,
      employeeInfo.picture,
      employeeInfo.birthday,
      employeeInfo.citizen_id,
      id,
      employeeInfo.address,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      employeeInfo.user_id
    ]
  )
);

EmployeeInfo.findById = id => (
  db.oneOrNone('SELECT * FROM employee_info WHERE user_id = $1', [id])
);

module.exports = EmployeeInfo;
