const router = require('express').Router();
const DegreeController = require('../../controllers/DegreeController');

router.post('/', DegreeController.create);

router.put('/', DegreeController.update);

router.get('/', DegreeController.findAll);

router.delete('/', DegreeController.delete);

module.exports = router;
