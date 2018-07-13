const router = require('express').Router();
const ViewResultController = require('../../controllers/ViewResultController');

router.post('/grading', ViewResultController.grading);

router.post('/fetchExam', ViewResultController.fetchExam);

module.exports = router;
