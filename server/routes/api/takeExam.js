const router = require('express').Router();
const TakeExamController = require('../../controllers/TakeExamController');

router.get('/fetchEPRList', TakeExamController.fetchEPRList);

// router.get('/', TakeExamController.fetchPositions);

module.exports = router;
