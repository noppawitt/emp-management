const router = require('express').Router();
const ViewResultController = require('../../controllers/ViewResultController');

router.get('/', ViewResultController.findByUserId);

module.exports = router;
