const router = require('express').Router();
const TakeExamController = require('../../controllers/TakeExamController');

router.get('/fetchEPRList', TakeExamController.fetchEPRList);

router.get('/fetchExamId', TakeExamController.fetchExamId);

router.get('/fetchRandomExIdList', TakeExamController.fetchRandomExIdList);

router.post('/fetchExamSpecifyId', TakeExamController.fetchExamSpecifyId);

router.post('/checkProgress', TakeExamController.findUploadedAnswer);

router.post('/uploadAnswer', TakeExamController.updateAnswer);

router.put('/updateStartTime', TakeExamController.updateStartTime);

router.post('/updateSubmittedTime', TakeExamController.updateSubmittedTime);

router.post('/deActivate', TakeExamController.deActivate);

module.exports = router;
