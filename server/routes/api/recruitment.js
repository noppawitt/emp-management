const router = require('express').Router();
const RecruitmentController = require('../../controllers/RecruitmentController');

router.get('/', RecruitmentController.fetchAllRecruitment);

router.get('/getTestDate', RecruitmentController.getTestDate);

router.post('/checkUserStatus', RecruitmentController.checkUserStatus);

router.post('/activateUser', RecruitmentController.activateUser);

router.post('/uploadRandomExIdList', RecruitmentController.uploadRandomExIdList);

router.post('/grading', RecruitmentController.grading);

router.post('/fetchExam', RecruitmentController.fetchExam);

router.post('/changeStatus', RecruitmentController.changeStatus);

module.exports = router;
