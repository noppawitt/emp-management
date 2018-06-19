const router = require('express').Router();
const RecruitmentController = require('../../controllers/RecruitmentController');

// change 'something' to anothing
router.get('/', RecruitmentController.fetchAllRecruitment);

module.exports = router;
