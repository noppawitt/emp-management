const router = require('express').Router();
const AccessControlController = require('../../controllers/AccessControlController');

router.post('/', AccessControlController.create);

<<<<<<< HEAD
router.get('/', AccessControlController.findAll);
=======
router.get('/', AccessControlController.find);
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6

module.exports = router;
