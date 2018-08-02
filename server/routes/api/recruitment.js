const router = require('express').Router();
const RecruitmentController = require('../../controllers/RecruitmentController');

router.get('/', RecruitmentController.fetchAllRecruitment);

router.get('/getTestDate', RecruitmentController.getTestDate);

router.post('/checkUserStatus', RecruitmentController.checkUserStatus);

router.post('/activateUser', RecruitmentController.activateUser);

router.post('/uploadRandomExIdList', RecruitmentController.uploadRandomExIdList);

router.post('/fetchGradingExam', RecruitmentController.fetchGradingExam);

router.post('/uploadGradeProgress', RecruitmentController.uploadGradeProgress);

router.post('/changeStatus', RecruitmentController.changeStatus);

module.exports = router;
