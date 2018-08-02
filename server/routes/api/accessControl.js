const router = require('express').Router();
const AccessControlController = require('../../controllers/AccessControlController');

router.post('/', AccessControlController.create);

router.get('/', AccessControlController.find);

module.exports = router;
