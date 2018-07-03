const router = require('express').Router();
const WorkExperienceController = require('../../controllers/WorkExperienceController');

router.post('/', WorkExperienceController.create);

router.delete('/', WorkExperienceController.delete);

module.exports = router;
