const router = require('express').Router();
const SelfAssessmentController = require('../../controllers/SelfAssessmentController');

router.get('/', ProbationController.find);
router.post('/', ProbationController.create);
router.put('/', ProbationController.update);

module.exports = router;
