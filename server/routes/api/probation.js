const router = require('express').Router();
const ProbationController = require('../../controllers/ProbationController');

router.get('/', ProbationController.findById);

module.exports = router;