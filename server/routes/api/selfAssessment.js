const router = require('express').Router();
const SelfAssessmentController = require('../../controllers/SelfAssessmentController');
const { can } = require('../../middlewares');

router.get('/check', can(['evaViewAll','evaViewOwn']), SelfAssessmentController.check);
router.get('/', can(['evaViewAll','evaViewOwn']), SelfAssessmentController.find);
router.post('/', can(['selfAssessmentAddEditSubmit']), SelfAssessmentController.create);
router.put('/', can(['selfAssessmentAddEditSubmit']), SelfAssessmentController.update);
router.put('/submit', can(['selfAssessmentAddEditSubmit']), SelfAssessmentController.submit);

module.exports = router;
