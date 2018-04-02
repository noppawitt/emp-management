const router = require('express').Router();

router.get('/hello', (req, res) => {
  res.json({
    text: 'hello'
  });
});

module.exports = router;
