const router = require('express').Router();
const passport = require('passport');
const auth = require('./auth');
const api = require('./api');

router.use('/auth', auth);
router.use('/api', passport.authenticate('jwt', { session: false }), api);

module.exports = router;
