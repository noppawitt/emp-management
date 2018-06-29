const router = require('express').Router();
const PerformanceController = require('../../controllers/PerformanceController');

router.get('/', PerformanceController.find);
router.post('/', PerformanceController.create);
router.put('/', PerformanceController.update);

module.exports = router;
