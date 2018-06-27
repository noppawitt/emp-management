const router = require('express').Router();
const RecruitmentController = require('../../controllers/RecruitmentController');

router.get('/checkPasswordStatus', RecruitmentController.checkPasswordStatus);
router.get('/assignNewPassword', RecruitmentController.assignNewPassword);
router.get('/', RecruitmentController.fetchAllRecruitment);

module.exports = router;
