const db = require('../db');

const TakeExam = {};

TakeExam.fetchAllExam = () => (
  db.many('SELECT * from exams')
);

TakeExam.fetchEPRList = id => (
  db.manyOrNone('SELECT'
    + ' epr_ex_category as category'
    + ', epr_ex_subcategory as subcategory'
    + ', epr_ex_type as type'
    + ', epr_requirednumber as required_number'
    + ' FROM recruitments r'
    + ' JOIN exams_position_required epr'
    + ' ON epr.epr_position = ANY( r.position )'
    + ' WHERE r.citizen_id = $1', [id])
);

TakeExam.fetchExamId = () => (
  db.manyOrNone('SELECT'
  + ' ex_category as category'
  + ', ex_subcategory as subcategory'
  + ', ex_type as type'
  + ', ARRAY_AGG( ex_id ) as ex_id_list'
  + ' FROM exams'
  + ' GROUP BY ex_category, ex_subcategory, ex_type'
  + ' ORDER BY ex_category, ex_subcategory, ex_type')
);

TakeExam.fetchRandomExIdList = id => (
  db.oneOrNone('SELECT random_ex_id_list FROM exam_users2 WHERE id = $1', [id])
);

TakeExam.fetchExamSpecifyId = idList => (
  db.manyOrNone('SELECT'
  + ' ex_id'
  + ', ex_category'
  + ', ex_subcategory'
  + ', ex_type'
  + ', ex_question'
  + ', ex_choice'
  + ', ARRAY_LENGTH(ex_answer, 1) as ex_answer_length'
  + ' FROM exams WHERE ex_id = ANY ($1)', [idList])
);

TakeExam.createBufferAnswer = (id, category, answerList, date) => (
  db.oneOrNone(
    'INSERT INTO exam_candidate_submitted (id, category, answer_list, test_date) VALUES ($1, $2, $3, $4)',
    [id, category, answerList, date]
  )
);

TakeExam.findUploadedAnswer = (id, type) => {
  // this 2 query do similar thing in same table
  // their difference is only return value type
  // so write it together or wait for reason to
  if (type === 'existing check') {
    return db.oneOrNone('SELECT 1 FROM exam_candidate_submitted WHERE id = $1', [id]);
  }
  else if (type === 'progress check') {
    return db.oneOrNone('SELECT * FROM exam_candidate_submitted WHERE id = $1', [id]);
  }
  return null;
};

TakeExam.updateAnswer = (id, category, answerList) => {
  console.log(id, '<<<');
  return db.oneOrNone('UPDATE exam_candidate_submitted SET (id, category, answer_list) = ($1, $2, $3)', [id, category, answerList]);
};

TakeExam.findUploadedCategory = id => (
  db.oneOrNone('SELECT * FROM exam_candidate_submitted WHERE id = $1', [id])
);

module.exports = TakeExam;
