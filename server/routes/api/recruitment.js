const router = require('express').Router();
const RecruitmentController = require('../../controllers/RecruitmentController');

router.get('/', RecruitmentController.fetchAllRecruitment);

module.exports = router;
