const router = require('express').Router();
const ExamController = require('../../controllers/ExamController');

router.post('/', ExamController.create);
router.get('/', ExamController.findAll);

module.exports = router;
