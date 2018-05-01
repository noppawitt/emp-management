const router = require('express').Router();
const MajorController = require('../../controllers/MajorController');

router.post('/', MajorController.create);

router.put('/', MajorController.update);

router.get('/', MajorController.findByFaculyId);

module.exports = router;
