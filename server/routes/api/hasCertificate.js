const router = require('express').Router();
const HasCertificateController = require('../../controllers/HasCertificateController');

router.post('/', HasCertificateController.create);

router.put('/', HasCertificateController.update);

router.get('/', HasCertificateController.findByUserId);

module.exports = router;
