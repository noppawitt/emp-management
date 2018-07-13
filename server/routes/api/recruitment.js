const router = require('express').Router();
const RecruitmentController = require('../../controllers/RecruitmentController');

router.get('/', RecruitmentController.fetchAllRecruitment);

router.get('/checkPasswordStatus', RecruitmentController.checkPasswordStatus);

router.get('/getTestDate', RecruitmentController.getTestDate);

router.post('/activatePassword', RecruitmentController.activatePassword);

router.post('/uploadRandomExIdList', RecruitmentController.uploadRandomExIdList);

router.post('/grading', RecruitmentController.grading);

router.post('/fetchExam', RecruitmentController.fetchExam);

router.post('/changeStatus', RecruitmentController.changeStatus);

module.exports = router;
