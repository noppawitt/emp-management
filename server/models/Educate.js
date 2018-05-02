const db = require('../db');
const moment = require('moment');

const Educate = {};

Educate.create = (educate, id) => (
  db.one(
    'INSERT INTO educates (user_id, university_id, faculty_id, major_id, degree_id, gpax, date_graduation, program, honor_flag, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING 1',
    [
      educate.userId,
      educate.universityId,
      educate.facultyId,
      educate.majorId,
      educate.degreeId,
      educate.gpax,
      educate.dateGraduation,
      educate.program,
      educate.honorFlag,
      id,
      id
    ]
  )
);

Educate.update = (educate, id) => (
  db.one(
    'UPDATE educates SET university_id = $1, faculty_id = $2, major_id = $3, degree_id = $4, gpax = $5, date_graduation = $6, program = $7, honor_flag = $8, updated_date = $9, updated_user = $10 WHERE id = $11',
    [
      educate.universityId,
      educate.facultyId,
      educate.majorId,
      educate.degreeId,
      educate.gpax,
      educate.dateGrauation,
      educate.program,
      educate.honorFlag,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      id,
      educate.id
    ]
  )
);

Educate.findByUserId = userId => (
  db.manyOrNone('SELECT educates.id, educates.user_id, educates.university_id, universities.name AS universities_name, educates.faculty_id, faculties.name AS faculties_name, educates.major_id, majors.name AS majors_name, educates.degree_id, degrees.name AS degrees_name, educates.gpax, educates.date_graduation, educates.program, educates.honor_flag FROM educates, universities, faculties, majors, degrees WHERE educates.university_id=universities.id AND educates.faculty_id=faculties.id AND educates.major_id=majors.id AND educates.degree_id=degrees.id AND user_id = $1', [userId])
);

module.exports = Educate;
