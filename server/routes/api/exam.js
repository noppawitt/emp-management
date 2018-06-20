const router = require('express').Router();
const ExamController = require('../../controllers/ExamController');

router.post('/', ExamController.create);
router.get('/', ExamController.findAll);
router.delete('/', ExamController.delete);

module.exports = router;
