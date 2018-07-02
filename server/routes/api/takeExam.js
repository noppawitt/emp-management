const router = require('express').Router();
const TakeExamController = require('../../controllers/TakeExamController');

router.get('/', TakeExamController.fetchAllExam);

module.exports = router;
