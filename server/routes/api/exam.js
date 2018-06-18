const router = require('express').Router();
const ExamController = require('../../controllers/ExamController');

router.post('/', ExamController.create);

module.exports = router;
