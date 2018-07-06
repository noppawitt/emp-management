const router = require('express').Router();
const RecruitmentController = require('../../controllers/RecruitmentController');

router.get('/checkPasswordStatus', RecruitmentController.checkPasswordStatus);

router.get('/activatePassword', RecruitmentController.activatePassword);

router.post('/uploadRandomExIdList', RecruitmentController.uploadRandomExIdList);

router.get('/', RecruitmentController.fetchAllRecruitment);

module.exports = router;
