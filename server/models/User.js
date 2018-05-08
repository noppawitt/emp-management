const db = require('../db');

const User = {};

User.create = (user, id) => (
  db.tx((transaction) => {
    const q1 = transaction.one(
      'INSERT INTO users (id, username, password, created_user, updated_user, type, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING 1',
      [
        user.id,
        user.username,
        user.password,
        id,
        id,
        user.type,
        user.status
      ]
    );
    const q2 = transaction.one(
      'INSERT INTO employee_info (user_id, first_name, last_name, citizen_id, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING 1',
      [
        user.id,
        user.firstName,
        user.lastName,
        user.citizenId,
        id,
        id
      ]
    );
    const q3 = transaction.one(
      'INSERT INTO employee_work (user_id, department_id, level_id, start_date, probation_date, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING 1',
      [
        user.id,
        user.departmentId,
        user.levelId,
        user.startDate,
        user.probationDate,
        id,
        id
      ]
    );
    return transaction.batch([q1, q2, q3]);
  })
);

User.findById = id => (
  db.oneOrNone('SELECT * FROM users WHERE id = $1', [id])
);

User.findByUsername = username => (
  db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])
);

User.findAll = () => (
  db.manyOrNone('SELECT users.id, employee_info.first_name, employee_info.last_name, employee_info.nick_name, employee_info.mobile_number, employee_info.email, employee_info.picture FROM employee_info, users WHERE users.id = employee_info.user_id AND users.status = $1 ORDER BY users.id ', ['Active'])
);

module.exports = User;
