const router = require('express').Router();
const ViewResultController = require('../../controllers/ViewResultController');

router.get('/', ViewResultController.findByUserId);

router.get('/grading', ViewResultController.grading);

router.get('/fetchUngradedExam', ViewResultController.fetchUngradedExam);

module.exports = router;
