const db = require('../db');
const moment = require('moment');

const Educate = {};

Educate.create = (educate, id) => (
  db.one(
    'INSERT INTO educates (user_id, university_id, faculty_id, major_id, degree_id, gpax, date_graduation, program, honor_flag, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING 1',
    [
      educate.user_id,
      educate.university_id,
      educate.faculty_id,
      educate.major_id,
      educate.degree_id,
      educate.gpax,
      educate.date_graduation,
      educate.program,
      educate.honor_flag,
      id,
      id
    ]
  )
);

Educate.update = (educate, id) => (
  db.one(
    'UPDATE educates SET university_id = $1, faculty_id = $2, major_id = $3, degree_id = $4, gpax = $5, date_graduation = $6, program = $7, honor_flag = $8, updated_date = $9, updated_user = $10 WHERE id = $11',
    [
      educate.university_id,
      educate.faculty_id,
      educate.major_id,
      educate.degree_id,
      educate.gpax,
      educate.date_graduation,
      educate.program,
      educate.honor_flag,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      id,
      educate.id
    ]
  )
);

Educate.findByUserId = userId => (
  db.manyOrNone('SELECT * FROM educates WHERE user_id = $1', [userId])
);

module.exports = Educate;
