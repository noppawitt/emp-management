const router = require('express').Router();
const employeeInfo = require('./employeeInfo');
const employeeWork = require('./employeeWork');
const user = require('./user');
const position = require('./position');
const department = require('./department');
const level = require('./level');
const contract = require('./contract');
const educate = require('./educate');
const hasCertificate = require('./hasCertificate');
const hasAsset = require('./hasAsset');
const assetType = require('./assetType');
const asset = require('./asset');
const certificate = require('./certificate');
const degree = require('./degree');
const faculty = require('./faculty');

router.use('/employee-info', employeeInfo);

router.use('/employee-work', employeeWork);

router.use('/users', user);

router.use('/positions', position);

router.use('/departments', department);

router.use('/levels', level);

router.use('/contracts', contract);

router.use('/educates', educate);

router.use('/has-certificates', hasCertificate);

router.use('/has-assets', hasAsset);

router.use('/asset-types', assetType);

router.use('/assets', asset);

router.use('/certificates', certificate);

router.use('/degrees', degree);

router.use('/faculties', faculty);

module.exports = router;
