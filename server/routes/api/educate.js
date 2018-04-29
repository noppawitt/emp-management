const router = require('express').Router();
const EducateController = require('../../controllers/EducateController');

router.post('/', EducateController.create);

router.put('/', EducateController.update);

router.get('/', EducateController.findByUserId);

module.exports = router;
