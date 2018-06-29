const router = require('express').Router();
const TakeExamController = require('../../controllers/TakeExamController');

router.get('/fetchSomething', TakeExamController.fetchSomething);

module.exports = router;
