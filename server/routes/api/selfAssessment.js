const router = require('express').Router();
const SelfAssessmentController = require('../../controllers/SelfAssessmentController');

router.get('/check', SelfAssessmentController.check);
router.get('/', SelfAssessmentController.find);
router.post('/', SelfAssessmentController.create);
router.put('/', SelfAssessmentController.update);
router.put('/submit', SelfAssessmentController.submit);

module.exports = router;
