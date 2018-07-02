const db = require('../db');

const TakeExam = {};

TakeExam.fetchCategory = id => (
  db.manyOrNone('SELECT DISTINCT epr_ex_category AS category FROM exams_position_required INNER JOIN recruitments on exams_position_required.epr_position = ANY(recruitments.position) WHERE recruitments.citizen_id = $1', [id])
);

TakeExam.fetchSubCategory = id => (
  db.manyOrNone('SELECT epr_ex_category AS category, epr_ex_subcategory AS subCategory FROM exams_position_required INNER JOIN recruitments on exams_position_required.epr_position = ANY(recruitments.position) WHERE recruitments.citizen_id = $1', [id])
);

module.exports = TakeExam;
