const db = require('../db');
const moment = require('moment');

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

TakeExam.createBufferAnswer = (id, answerList, testDate) => (
  db.oneOrNone(
    'INSERT INTO exam_candidate_submitted (id, answer_list, test_date) VALUES ($1, $2, $3)',
    [id, answerList, testDate]
  )
);

TakeExam.findUploadedAnswer = (id, type, testDate) => {
  // this 2 query do similar thing in same table
  // their difference is only return value type
  // so write it together or wait for reason to
  if (type === 'existing check') {
    return db.oneOrNone('SELECT 1 FROM exam_candidate_submitted WHERE id = $1 AND test_date = $2', [id, testDate]);
  }
  else if (type === 'progress check') {
    return db.oneOrNone('SELECT * FROM exam_candidate_submitted WHERE id = $1 AND test_date = $2', [id, testDate]);
  }
  return null;
};

TakeExam.updateAnswer = (id, answerList, submittedTime, testDate) => {
  return db.oneOrNone('UPDATE exam_candidate_submitted SET (answer_list, submitted_time) = ($2, $3)'
    + ' WHERE id = $1 AND test_date = $4', [id, answerList, submittedTime, testDate]);
};

TakeExam.updateStartTime = (startTime, id, testDate) => {
  const start = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
  return db.none('UPDATE exam_candidate_submitted SET start_time = $1 WHERE id = $2 AND test_date = $3', [start, id, testDate]);
};

TakeExam.updateSubmittedTime = (id, time, testDate) => (
  db.oneOrNone('UPDATE exam_candidate_submitted SET submitted_time = $2 WHERE id = $1 AND test_date = $3', [id, moment(time).format('YYYY-MM-DD HH:mm:ss'), testDate])
);

TakeExam.changeStatus = (id, status) => (
  db.oneOrNone('UPDATE recruitments SET status = $2 WHERE citizen_id =$1', [id, status])
);

TakeExam.expiredActivationLifetime = id => (
  db.oneOrNone('UPDATE exam_users2 SET activation_lifetimes = 0 WHERE id = $1', [id])
);

module.exports = TakeExam;
